import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const GEMINI_MODEL = "gemini-3.5-flash";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY?.trim(),
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const logAIError = (error) => {
  const details = error?.response?.data ??
    error?.error ?? {
      message: error?.message,
      status: error?.status,
      code: error?.code,
      type: error?.type,
      requestID: error?.requestID,
    };

  console.error("Gemini/OpenAI error:", JSON.stringify(details, null, 2));
};

const ARTICLE_SYSTEM_PROMPT =
  "You are a senior editorial writer. Write polished, complete articles in Markdown. Output only the article itself. Never include notes, explanations, analysis, or meta commentary. End with a proper conclusion.";

const countWords = (text = "") =>
  text.trim().split(/\s+/).filter(Boolean).length;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRateLimitError = (error) =>
  error?.status === 429 || error?.response?.status === 429;

const isRetryableAIError = (error) =>
  isRateLimitError(error) ||
  error?.status === 503 ||
  error?.response?.status === 503;

const looksTruncated = (content, finishReason) => {
  if (finishReason === "length") return true;

  const trimmed = (content ?? "").trim();
  if (!trimmed) return true;

  return !/[.!?]["'”’]?$/u.test(trimmed);
};

const createTextCompletion = ({
  prompt,
  maxTokens,
  continuationText,
  systemPrompt = ARTICLE_SYSTEM_PROMPT,
}) => {
  const messages = [
    { role: "system", content: systemPrompt },
    ...(continuationText
      ? [{ role: "user", content: continuationText(prompt) }]
      : [{ role: "user", content: prompt }]),
  ];

  return AI.chat.completions.create({
    model: GEMINI_MODEL,
    messages,
    temperature: 0.5,
    max_tokens: maxTokens,
  });
};

const createTextCompletionWithRetry = async (options, maxAttempts = 3) => {
  let lastError;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      return await createTextCompletion(options);
    } catch (error) {
      lastError = error;

      if (!isRetryableAIError(error) || attempt === maxAttempts - 1) {
        throw error;
      }

      const backoffMs = 500 * 2 ** attempt;
      await sleep(backoffMs);
    }
  }

  throw lastError;
};

const generateTextContent = async ({
  prompt,
  maxTokens,
  allowContinuation = false,
  continuationPrompt,
  targetWords,
}) => {
  const firstResponse = await createTextCompletionWithRetry({
    prompt,
    maxTokens,
  });
  let content = firstResponse.choices[0].message.content;
  let finishReason = firstResponse.choices[0].finish_reason;

  if (!allowContinuation) {
    return content;
  }

  let attempts = 0;
  while (
    attempts < 2 &&
    (looksTruncated(content, finishReason) ||
      (targetWords && countWords(content) < targetWords * 0.85))
  ) {
    const continuationResponse = await createTextCompletionWithRetry({
      prompt,
      maxTokens: Math.max(Math.round(maxTokens / 2), 600),
      continuationText: (basePrompt) =>
        `${continuationPrompt}\n\nContinue the article seamlessly from the last sentence. Do not repeat earlier text. Output only the continuation in Markdown.\n\n${basePrompt}\n\nARTICLE SO FAR:\n${content}`,
    });

    const continuation = continuationResponse.choices[0].message.content;
    if (!continuation || continuation.trim() === content.trim()) {
      break;
    }

    content = `${content.trim()}\n\n${continuation.trim()}`;
    finishReason = continuationResponse.choices[0].finish_reason;
    attempts += 1;
  }

  return content;
};

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { topic, length, targetWords } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "subscription" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. upgrade to continue.",
      });
    }

    const maxTokens = Math.max(Number(length) || 0, 1800);
    const resolvedTargetWords = Number(targetWords) || 900;
    const articlePrompt = `Write a complete, well-structured article about "${topic}". Target length: approximately ${resolvedTargetWords} words. Use Markdown headings, a strong introduction, detailed body sections, and a proper conclusion. Do not include any notes, explanations, or analysis. Output only the final article.`;

    const content = await generateTextContent({
      prompt: articlePrompt,
      maxTokens,
      allowContinuation: true,
      continuationPrompt: `The article below was cut off while writing about "${topic}".`,
      targetWords: resolvedTargetWords,
    });

    await sql`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId}, ${articlePrompt}, ${content}, 'article')`;

    if (plan !== "subscription") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    if (isRateLimitError(error)) {
      return res.json({
        success: false,
        message:
          "AI quota or rate limit reached. Please wait a moment and try again.",
      });
    }

    logAIError(error);
    res.json({ success: false, message: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "subscription" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. upgrade to continue.",
      });
    }

    const content = await generateTextContent({
      prompt,
      maxTokens: 100,
    });

    await sql`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "subscription") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    if (isRateLimitError(error)) {
      return res.json({
        success: false,
        message:
          "AI quota or rate limit reached. Please wait a moment and try again.",
      });
    }

    logAIError(error);
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "subscription") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      },
    );

    const base64Image = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`INSERT INTO creations (user_id,prompt,content,type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "subscription") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== "subscription") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions.",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    const promptText = `Removed ${object} from image`;

    await sql`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId}, ${promptText}, ${imageUrl}, 'image')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "subscription") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weeknesses and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const content = await generateTextContent({
      prompt,
      maxTokens: 1000,
    });

    await sql`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    res.json({ success: true, content: content });
  } catch (error) {
    logAIError(error);
    res.json({ success: false, message: error.message });
  }
};
