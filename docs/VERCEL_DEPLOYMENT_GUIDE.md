# Step-by-Step Vercel Deployment Guide

This project has two apps:

- `backend`: Next.js API routes
- `frontend`: Vite React app

You should deploy them as two separate Vercel projects from the same GitHub repository. Deploy the backend first, then use the backend URL when deploying the frontend.

## Why Backend First?

The frontend calls the backend through this environment variable:

```text
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

So the backend URL must exist before the frontend is deployed.

## Important: Do Not Use `projects` in `vercel.json`

Vercel does not support this:

```json
{
  "projects": []
}
```

If `vercel.json` contains `projects`, Vercel shows this error:

```text
Invalid request: should NOT have additional property `projects`.
```

Use the Vercel dashboard to create two projects instead.

## Prerequisites

You need:

- GitHub account
- Vercel account
- Supabase account
- Node.js installed locally
- This repo pushed to GitHub

Supabase should already have:

- `todos` table
- `notes` table
- `note_files` table
- `note-files` storage bucket

You also need these Supabase values:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Find them in Supabase:

1. Open your Supabase project.
2. Go to **Settings**.
3. Go to **API**.
4. Copy the Project URL and anon public key.

## Local Build Check

Run these before deploying:

```bash
cd backend
npm install
npm run build

cd ../frontend
npm install
npm run build
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```bash
npm.cmd run build
```

## Part 1: Deploy the Backend

1. Go to [vercel.com](https://vercel.com).
2. Log in.
3. Click **Add New Project**.
4. Select your GitHub repository.
5. Click **Import**.

Configure the backend project:

```text
Project Name: musto-backend
Root Directory: backend
Framework Preset: Next.js
Build Command: npm run build
```

Add environment variables:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Then click **Deploy**.

When deployment finishes, copy the backend URL. It will look like:

```text
https://musto-backend.vercel.app
```

Test this URL in your browser:

```text
https://musto-backend.vercel.app/api/health
```

Expected result: a JSON response saying the backend is running.

## Part 2: Deploy the Frontend

1. Go back to the Vercel dashboard.
2. Click **Add New Project** again.
3. Select the same GitHub repository again.
4. Click **Import**.

Configure the frontend project:

```text
Project Name: musto-frontend
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Add this environment variable:

```text
VITE_API_BASE_URL=https://musto-backend.vercel.app
```

Use your real backend URL. Do not include a trailing slash.

Correct:

```text
https://musto-backend.vercel.app
```

Wrong:

```text
https://musto-backend.vercel.app/
```

Click **Deploy**.

## Part 3: Verify the App

After both deployments finish:

1. Open your frontend Vercel URL.
2. Open browser DevTools.
3. Go to the Network tab.
4. Create a todo.
5. Create a note.
6. Make sure API requests go to your backend URL.

Useful backend test URLs:

```text
https://your-backend-url.vercel.app/api/health
https://your-backend-url.vercel.app/api/todos
https://your-backend-url.vercel.app/api/notes
```

## Vercel CLI Alternative

Dashboard deployment is easier for this project, but CLI also works.

Install and log in:

```bash
npm i -g vercel
vercel login
```

Deploy backend:

```bash
cd backend
vercel --prod
```

When prompted:

- Create a new project
- Use project name `musto-backend`
- Set root as current directory
- Add `SUPABASE_URL`
- Add `SUPABASE_ANON_KEY`

Copy the backend URL.

Deploy frontend:

```bash
cd ../frontend
vercel --prod
```

When prompted:

- Create a new project
- Use project name `musto-frontend`
- Set root as current directory
- Add `VITE_API_BASE_URL` with the backend URL

## Common Issues

### Vercel says `additional property projects`

Cause: `vercel.json` contains a top-level `projects` field.

Fix: remove `projects` from `vercel.json`. Use separate Vercel projects instead.

### Frontend says failed to fetch

Cause: `VITE_API_BASE_URL` is missing or wrong.

Fix:

1. Open Vercel dashboard.
2. Go to the frontend project.
3. Open **Settings**.
4. Open **Environment Variables**.
5. Set `VITE_API_BASE_URL` to the backend URL.
6. Redeploy the frontend.

### Backend has Supabase errors

Cause: Supabase environment variables are missing or wrong.

Fix:

1. Open Vercel dashboard.
2. Go to the backend project.
3. Open **Settings**.
4. Open **Environment Variables**.
5. Check `SUPABASE_URL`.
6. Check `SUPABASE_ANON_KEY`.
7. Redeploy the backend.

### File upload fails

Cause: Supabase storage bucket is missing or not public.

Fix:

1. Open Supabase.
2. Go to **Storage**.
3. Check that `note-files` exists.
4. Check bucket permissions and policies.

### Local build works but Vercel still uses old settings

Cause: Vercel can cache old project settings.

Fix:

1. Check the project's Root Directory.
2. Check environment variables.
3. Redeploy from the latest GitHub commit.
4. If the project was created with the wrong root, create a fresh Vercel project.
