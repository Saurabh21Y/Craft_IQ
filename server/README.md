# CraftIQ Backend

Express + Node.js backend for the CraftIQ AI SaaS application.

## Setup

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a local environment file:

```bash
copy .env.example .env
```

3. Update `.env` with your credentials and database connection string.

## Environment variables

Create `server/.env` using this template:

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

## Run locally

Start the backend dev server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

## Notes

- The backend requires a valid PostgreSQL connection in `DATABASE_URL`.
- AI features depend on `GEMINI_API_KEY` and `CLIPDROP_API_KEY`.
- Image upload and storage depend on Cloudinary credentials.
- Clerk auth requires both Clerk keys.
