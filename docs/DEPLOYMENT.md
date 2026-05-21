# MUSTO Deployment Guide

MUSTO deploys to Vercel as two projects from the same GitHub repository:

- `backend`: Next.js API project
- `frontend`: Vite React app

Deploy the backend first, copy its Vercel URL, then deploy the frontend with that URL in `VITE_API_BASE_URL`.

## Important Vercel Config Note

The root `vercel.json` must not contain a `projects` property. Vercel does not support defining multiple projects inside `vercel.json`.

Valid minimal config:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json"
}
```

Invalid config:

```json
{
  "projects": []
}
```

That invalid config causes:

```text
Invalid request: should NOT have additional property `projects`.
```

## Required Environment Variables

Backend Vercel project:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Frontend Vercel project:

```text
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

Do not include a trailing slash in `VITE_API_BASE_URL`.

## Deploy Backend

1. Push this repository to GitHub.
2. Open [vercel.com](https://vercel.com).
3. Click **Add New Project**.
4. Import the GitHub repository.
5. Set:
   - Root Directory: `backend`
   - Framework Preset: Next.js
   - Build Command: `npm run build`
6. Add backend environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
7. Deploy.
8. Copy the backend deployment URL.

Check the backend:

```text
https://your-backend-url.vercel.app/api/health
```

## Deploy Frontend

1. Click **Add New Project** in Vercel again.
2. Import the same GitHub repository again.
3. Set:
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add frontend environment variable:
   - `VITE_API_BASE_URL=https://your-backend-url.vercel.app`
5. Deploy.

## Local Build Commands

```bash
cd backend
npm run build

cd ../frontend
npm run build
```

On Windows PowerShell, if `npm` is blocked by execution policy:

```bash
npm.cmd run build
```

## Troubleshooting

### Invalid request: should NOT have additional property `projects`

Remove the `projects` property from `vercel.json`. Create separate Vercel projects through the Vercel dashboard instead.

### Frontend cannot fetch todos or notes

Check the frontend project's `VITE_API_BASE_URL`. It must point to the deployed backend URL.

### Frontend works until refresh, then shows 404

The frontend uses browser routes like `/todo` and `/notes`. The `frontend/vercel.json` file rewrites all frontend paths to `index.html`, so React Router can load the right page. Redeploy the frontend after adding or changing that file.

### Backend cannot connect to Supabase

Check the backend project's `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment variables.

### File upload fails

Check that the Supabase `note-files` bucket exists and is public, and that your Supabase policies allow the app to use it.
