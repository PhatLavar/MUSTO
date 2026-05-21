# MUSTO Vercel Quick Start

Deploy this repo as two separate Vercel projects:

1. Backend first: `backend`
2. Frontend second: `frontend`

Do not add a `projects` array to `vercel.json`. Vercel rejects that with:

```text
Invalid request: should NOT have additional property `projects`.
```

## Before You Deploy

Make sure you have:

- Code pushed to GitHub
- A Vercel account
- A Supabase project
- Supabase tables: `todos`, `notes`, `note_files`
- Supabase storage bucket: `note-files`

Local build check:

```bash
cd backend
npm run build

cd ../frontend
npm run build
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```bash
npm.cmd run build
```

## Step 1: Deploy Backend

1. Go to [vercel.com](https://vercel.com).
2. Click **Add New Project**.
3. Import your GitHub repository.
4. Configure the project:
   - Project name: `musto-backend`
   - Root Directory: `backend`
   - Framework Preset: Next.js
   - Build Command: `npm run build`
5. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
6. Click **Deploy**.
7. Copy the backend URL, for example:

```text
https://musto-backend.vercel.app
```

Test it:

```text
https://your-backend-url.vercel.app/api/health
```

## Step 2: Deploy Frontend

1. Go back to Vercel.
2. Click **Add New Project** again.
3. Import the same GitHub repository again.
4. Configure the project:
   - Project name: `musto-frontend`
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable:
   - `VITE_API_BASE_URL=https://your-backend-url.vercel.app`
6. Do not add a trailing slash to `VITE_API_BASE_URL`.
7. Click **Deploy**.

## Verify

After both deployments finish:

- Open the frontend URL.
- Create a todo.
- Create a note.
- Open browser DevTools and check for failed requests.

Common fixes:

| Problem | Fix |
| --- | --- |
| Frontend cannot fetch data | Check `VITE_API_BASE_URL` in the frontend Vercel project |
| Refreshing `/todo` or `/notes` gives 404 | Keep `frontend/vercel.json` rewrite and redeploy frontend |
| Backend returns Supabase errors | Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in the backend Vercel project |
| Vercel says `additional property projects` | Remove `projects` from `vercel.json` |
| Local PowerShell blocks npm | Use `npm.cmd run build` |
