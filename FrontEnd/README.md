# CraftIQ Frontend

React + Vite frontend for the CraftIQ AI SaaS application.

## Setup

1. Install dependencies:

```bash
cd FrontEnd
npm install
```

2. Create a local environment file:

```bash
copy .env.example .env
```

3. Update `.env` with your values.

## Environment variables

Create `FrontEnd/.env` using this template:

```env
VITE_BASE_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
```

## Run locally

Start the frontend dev server:

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

## Preview build

Preview the production build locally:

```bash
npm run preview
```

## Notes

- The frontend expects the backend API to be running at the URL defined in `VITE_BASE_URL`.
- If you change backend port or deployment URL, update `VITE_BASE_URL` accordingly.
