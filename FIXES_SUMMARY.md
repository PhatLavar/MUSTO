# MUSTO Fixes Summary

## Deployment Fixes

- Removed the unsupported `projects` array from `vercel.json`.
- Kept `vercel.json` as a valid minimal Vercel schema config.
- Updated deployment docs to explain that backend and frontend must be separate Vercel projects.
- Removed the backend `next/font/google` dependency so builds do not depend on fetching Google Fonts.

## Backend

- CORS headers are configured in `backend/next.config.ts`.
- Supabase is read from environment variables:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
- Backend should be deployed first from the `backend` root directory.

## Frontend

- Frontend API calls use:

```text
VITE_API_BASE_URL
```

- Frontend should be deployed second from the `frontend` root directory.
- `VITE_API_BASE_URL` must point to the deployed backend URL.

## Correct Vercel Deployment Flow

1. Deploy backend:

```bash
cd backend
vercel --prod
```

2. Copy the backend URL.

3. Deploy frontend:

```bash
cd ../frontend
vercel --prod
```

4. Set this frontend environment variable:

```text
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

## Local Build Checks

```bash
cd backend
npm run build

cd ../frontend
npm run build
```

On Windows PowerShell, use `npm.cmd run build` if `npm` is blocked by execution policy.

## Current Status

- Backend build passes.
- Frontend build passes.
- Vercel config schema error is fixed.
- Deployment docs now match the required backend-first, frontend-second flow.
