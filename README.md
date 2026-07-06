# CraftIQ

CraftIQ is an AI SaaS application for generating and managing content. It includes a React + Vite frontend and an Express + Node.js backend.

## What this project does

CraftIQ provides the following tools:

- AI article generation
- Blog title generation
- Image generation
- Background removal
- Object removal
- Resume review
- Dashboard/history of user creations
- Community page for published creations

## Tech stack

### Frontend

- React 19
- Vite
- React Router
- Clerk React
- Axios
- Tailwind CSS
- React Markdown
- React Hot Toast

### Backend

- Node.js
- Express 5
- Clerk Express
- Neon PostgreSQL
- Cloudinary
- OpenAI SDK with Gemini base URL
- Clipdrop API
- Multer

## Project structure

```text
Craft_IQ/
├── FrontEnd/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── README.md
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- A Neon PostgreSQL database
- Clerk application keys
- Gemini API key
- Clipdrop API key
- Cloudinary account credentials

## Environment files

The project uses two separate environment files:

- `server/.env`
- `FrontEnd/.env`

Example templates are included:

- `server/.env.example`
- `FrontEnd/.env.example`

Copy the example files and fill in your own values.

## Server environment variables

Use `server/.env` with values like these:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require

CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PORT=5000
```

### What each server variable does

- `DATABASE_URL` — connects the backend to Neon PostgreSQL
- `CLERK_PUBLISHABLE_KEY` — Clerk app publishable key used for auth setup
- `CLERK_SECRET_KEY` — Clerk backend secret key
- `GEMINI_API_KEY` — used for article, blog title, and resume AI generation
- `CLIPDROP_API_KEY` — used for image generation
- `CLOUDINARY_*` — used to store generated and processed images
- `PORT` — backend port, defaults to `5000`

## Frontend environment variables

Use `FrontEnd/.env` with values like these:

```env
VITE_BASE_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
```

### What each frontend variable does

- `VITE_BASE_URL` — backend API base URL
- `VITE_CLERK_PUBLISHABLE_KEY` — Clerk publishable key for the React app

## Installation

### 1) Install backend dependencies

```bash
cd server
npm install
```

### 2) Install frontend dependencies

```bash
cd FrontEnd
npm install
```

### 3) Create env files

Copy the example files:

```bash
copy server\.env.example server\.env
copy FrontEnd\.env.example FrontEnd\.env
```

Then fill in the real values.

## Running the project locally

### Start the backend

From the `server` folder:

```bash
npm run dev
```

This starts the Express backend using Nodemon.

### Start the frontend

From the `FrontEnd` folder:

```bash
npm run dev
```

This starts the Vite development server.

## Build and preview

### Frontend production build

```bash
cd FrontEnd
npm run build
```

### Preview the frontend build

```bash
npm run preview
```

### Start backend in production mode

```bash
cd server
npm start
```

## Frontend routes

The app contains these main routes:

- `/` — landing page
- `/ai` — dashboard
- `/ai/write-article` — article generator
- `/ai/blog-titles` — blog title generator
- `/ai/generate-images` — image generator
- `/ai/remove-background` — background remover
- `/ai/remove-object` — object remover
- `/ai/review-resume` — resume reviewer
- `/ai/community` — community feed

## Backend API routes

### AI routes

- `POST /api/ai/generate-article`
- `POST /api/ai/generate-blog-title`
- `POST /api/ai/generate-image`
- `POST /api/ai/remove-image-background`
- `POST /api/ai/remove-image-object`
- `POST /api/ai/resume-review`

### User routes

- `GET /api/user/get-user-creations`
- `POST /api/user/get-user-creations`
- `GET /api/user/get-published-creations`
- `POST /api/user/toggle-like-creations`

## Main feature flow

### Dashboard

The dashboard shows:

- total creations count
- active plan
- recent creations history

### Article generator

The article generator accepts:

- topic
- length choice

It returns a full Markdown article and stores it in the database.

### Blog title generator

Generates multiple title ideas for a topic.

### Image tools

The app supports:

- image generation
- background removal
- object removal

### Resume reviewer

Uploads a PDF resume and returns AI feedback.

### Community

Shows published creations and supports likes.

## Data storage

The app stores creations in a `creations` table. Each item includes:

- user ID
- prompt
- content
- type
- publish flag for images
- likes array for community posts
- timestamps

## Authentication

The app uses Clerk for authentication.

- Frontend uses `ClerkProvider`
- Backend uses `clerkMiddleware()` and `requireAuth()`

## Notes about secrets

- Do **not** commit `.env` files
- Use the `.env.example` files as templates
- If a secret was exposed previously, rotate it before production use

## Troubleshooting

### Backend does not start

Check:

- `server/.env` exists
- `DATABASE_URL` is valid
- Clerk keys are correct
- backend dependencies are installed

### Frontend does not start

Check:

- `FrontEnd/.env` exists
- `VITE_BASE_URL` points to the backend
- `VITE_CLERK_PUBLISHABLE_KEY` is set

### AI requests fail

Check:

- `GEMINI_API_KEY` is valid
- `CLIPDROP_API_KEY` is valid
- API rate limits / quotas are not exceeded

### Images fail to upload or process

Check:

- Cloudinary credentials are valid
- `CLIPDROP_API_KEY` is present for image generation

## Helpful docs

- `FrontEnd/README.md` — frontend-only setup
- `server/README.md` — backend-only setup

## Quick start summary

1. Install backend dependencies
2. Install frontend dependencies
3. Create `server/.env` from `server/.env.example`
4. Create `FrontEnd/.env` from `FrontEnd/.env.example`
5. Start backend with `npm run dev` in `server`
6. Start frontend with `npm run dev` in `FrontEnd`

## Final note

This project will not run properly after a fresh clone until the required environment variables are added. Once those are set, the app should work normally.
