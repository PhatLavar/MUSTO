# MUSTO Deployment Checklist

## Project Configuration

- [x] `vercel.json` uses a valid minimal Vercel schema config
- [x] `vercel.json` does not contain a `projects` array
- [x] Backend and frontend are deployed as separate Vercel projects
- [x] Backend Google font build dependency removed
- [x] Frontend API URL uses `VITE_API_BASE_URL`
- [x] Backend CORS headers configured in `backend/next.config.ts`
- [x] `.env.example` files exist for setup reference

## Before Deploying

1. Supabase
   - [ ] Supabase project exists
   - [ ] Tables exist: `todos`, `notes`, `note_files`
   - [ ] Storage bucket exists: `note-files`
   - [ ] Storage bucket is public if uploaded files should be public
   - [ ] You have copied `SUPABASE_URL`
   - [ ] You have copied `SUPABASE_ANON_KEY`

2. Local builds
   - [ ] `npm run build` passes in `backend`
   - [ ] `npm run build` passes in `frontend`
   - [ ] No TypeScript errors

3. GitHub
   - [ ] Latest code is committed
   - [ ] Latest code is pushed to GitHub
   - [ ] `.env.local` files are not committed

## Backend Vercel Project

- [ ] Import the GitHub repository into Vercel
- [ ] Root Directory is `backend`
- [ ] Framework Preset is Next.js
- [ ] Build Command is `npm run build`
- [ ] Environment variable `SUPABASE_URL` is set
- [ ] Environment variable `SUPABASE_ANON_KEY` is set
- [ ] Backend deployment succeeds
- [ ] `/api/health` returns a healthy response

## Frontend Vercel Project

- [ ] Import the same GitHub repository into Vercel again
- [ ] Root Directory is `frontend`
- [ ] Framework Preset is Vite
- [ ] Build Command is `npm run build`
- [ ] Output Directory is `dist`
- [ ] Environment variable `VITE_API_BASE_URL` is set to the backend URL
- [ ] `VITE_API_BASE_URL` does not end with `/`
- [ ] Frontend deployment succeeds

## After Deploying

- [ ] Frontend loads
- [ ] Todo list loads
- [ ] Can create a todo
- [ ] Can update a todo
- [ ] Can delete a todo
- [ ] Notes page loads
- [ ] Can create a note
- [ ] Can update a note
- [ ] Can delete a note
- [ ] Browser console has no API URL errors

## Common Problems

| Problem | Fix |
| --- | --- |
| `additional property projects` | Remove `projects` from `vercel.json` |
| Frontend fetch fails | Fix `VITE_API_BASE_URL` in the frontend Vercel project |
| Backend Supabase errors | Fix `SUPABASE_URL` and `SUPABASE_ANON_KEY` in the backend Vercel project |
| Upload errors | Check the Supabase `note-files` bucket and policies |
| Local PowerShell blocks npm | Use `npm.cmd run build` |
