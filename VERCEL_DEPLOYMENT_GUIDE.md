# 🚀 Step-by-Step Vercel Deployment Guide

Complete instructions for deploying MUSTO to Vercel with zero configuration headaches.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Prepare Your Project](#prepare-your-project)
3. [Method 1: Vercel Dashboard (Easiest)](#method-1-vercel-dashboard-easiest)
4. [Method 2: Vercel CLI](#method-2-vercel-cli)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Common Issues & Solutions](#common-issues--solutions)

---

## Prerequisites

✅ **Required:**
- GitHub account (push code here)
- Vercel account (free at [vercel.com](https://vercel.com))
- Supabase account (free at [supabase.com](https://supabase.com))
- Node.js 18+ installed locally

✅ **Prepared:**
- MUSTO project with all fixes applied
- Supabase project with tables created
- Backend and frontend `.env.example` files

---

## Prepare Your Project

### Step 1: Verify Local Setup Works

Before deploying, test everything locally:

```bash
# Backend test
cd backend
npm install
npm run build  # Should complete without errors
npm run dev    # Should start without errors

# In another terminal, test frontend
cd frontend
npm install
npm run build  # Should complete without errors
npm run dev    # Should start without errors
```

✅ Both should run without errors!

### Step 2: Commit All Changes

```bash
cd MUSTO  # project root
git add .
git commit -m "Prepare for Vercel deployment - all checks passed"
git push origin main
```

### Step 3: Gather Required Information

You'll need these values when deploying. Collect them now:

**From Supabase Dashboard:**
1. Go to [supabase.com](https://supabase.com) → Your Project
2. Click Settings → API
3. Copy these values:
   - `Project URL` → This is your `SUPABASE_URL`
   - `anon (public)` key → This is your `SUPABASE_ANON_KEY`

Save them in a secure location (not in code!).

---

## Method 1: Vercel Dashboard (Easiest)

### Step 1: Create Vercel Account & Login

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click "Authorize Vercel"

### Step 2: Import Your Project

1. Click **"Add New Project"** (or go to Dashboard → New Project)
2. Under "Where's your code?", select **GitHub**
3. Search for your MUSTO repository
4. Click **"Import"**

Vercel will auto-detect your monorepo and ask how to configure it.

### Step 3: Configure Backend Project

When prompted for project configuration:

1. **Project Name:** `musto-backend` (or any name you prefer)
2. **Root Directory:** Select **`backend`** from dropdown
3. **Build & Development Settings:**
   - Build command: `npm run build`
   - Output directory: `.next`
4. **Environment Variables:**
   - Click "Add"
   - Name: `SUPABASE_URL`
   - Value: Paste your Supabase URL from earlier
   - Click "Add" again
   - Name: `SUPABASE_ANON_KEY`
   - Value: Paste your Supabase anon key

5. Click **"Deploy"** and wait for build to complete

**⏳ Expected time:** 2-3 minutes

Once deployed, **copy your backend URL** (looks like `https://musto-backend-xxxxx.vercel.app`) - you'll need it for the frontend!

### Step 4: Configure Frontend Project

Back in Vercel Dashboard:

1. Click **"Add New Project"** again
2. Select **GitHub** and search for MUSTO
3. When importing the same repo, Vercel will ask to create a separate project
4. Click **"Create new team"** if needed, or continue with existing team

Configuration:
1. **Project Name:** `musto-frontend` (or any name)
2. **Root Directory:** Select **`frontend`** from dropdown
3. **Build & Development Settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Environment Variables:**
   - Name: `VITE_API_BASE_URL`
   - Value: Paste your **backend URL** from Step 3 (e.g., `https://musto-backend-xxxxx.vercel.app`)
   - ⚠️ **IMPORTANT:** Do NOT include trailing slash!

5. Click **"Deploy"** and wait for build

**⏳ Expected time:** 2-3 minutes

### Step 5: Verify Deployment

Once both deploy successfully:

1. Visit your frontend URL
2. You should see the MUSTO application
3. Try creating a todo or note
4. Check the console for any errors

✅ **If everything works, you're done!**

---

## Method 2: Vercel CLI

For those who prefer command line:

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login

```bash
vercel login
```

Follow the prompts to log in with GitHub.

### Step 3: Deploy Backend

```bash
cd backend
vercel --prod
```

During prompts:
- Set project name: `musto-backend`
- Link to existing project?: No
- Set production environment variables:
  - `SUPABASE_URL=your_url`
  - `SUPABASE_ANON_KEY=your_key`

**Copy the deployed URL!**

### Step 4: Deploy Frontend

```bash
cd ../frontend
vercel --prod
```

During prompts:
- Set project name: `musto-frontend`
- Link to existing project?: No
- Set production environment variables:
  - `VITE_API_BASE_URL=https://musto-backend-xxxxx.vercel.app`

### Step 5: Test

Visit your frontend URL and test the application.

---

## Post-Deployment Verification

### ✅ Checklist

- [ ] Frontend loads without errors
- [ ] Can navigate between Todo and Notes pages
- [ ] Can create a new todo
- [ ] Can view all todos
- [ ] Can update a todo
- [ ] Can delete a todo
- [ ] Can create a new note
- [ ] Can view all notes
- [ ] Can update a note
- [ ] Can delete a note
- [ ] File upload works (if applicable)
- [ ] No console errors in browser DevTools
- [ ] No 404 errors

### 🔍 Testing Commands

Use browser DevTools (F12) to check the Network tab:

1. **Test health endpoint:**
```
GET https://your-backend.vercel.app/api/health
```
Should return: `{"status": "ok", "message": "MUSTO backend is running!"}`

2. **Test todos endpoint:**
```
GET https://your-backend.vercel.app/api/todos
```
Should return an array of todos

3. **Test notes endpoint:**
```
GET https://your-backend.vercel.app/api/notes
```
Should return an array of notes

---

## Common Issues & Solutions

### ❌ Issue: Frontend shows "Failed to fetch todos"

**Cause:** Wrong backend URL

**Solution:**
1. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Update `VITE_API_BASE_URL` with correct backend URL
3. Redeploy frontend (Deployments → Redeploy)

### ❌ Issue: "SUPABASE_ANON_KEY is missing"

**Cause:** Backend environment variables not set

**Solution:**
1. Go to Vercel Dashboard → Backend Project → Settings → Environment Variables
2. Verify both `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
3. Redeploy backend

### ❌ Issue: Build fails with TypeScript errors

**Cause:** Code has type errors

**Solution:**
1. Run `npm run build` locally to see exact errors
2. Fix errors
3. Push to GitHub
4. Vercel will auto-redeploy

### ❌ Issue: Supabase connection timeout

**Cause:** Wrong Supabase URL or network issue

**Solution:**
1. Verify Supabase URL in .env variables
2. Test URL is correct: `https://xxxxx.supabase.co`
3. Check Supabase project is not in sleep mode (paid plan)

### ❌ Issue: File upload returns 500 error

**Cause:** Storage bucket not configured

**Solution:**
1. Go to Supabase → Storage → Buckets
2. Verify `note-files` bucket exists
3. Ensure bucket is public
4. Check RLS policies allow uploads

### ❌ Issue: CORS error in browser console

**Cause:** Frontend and backend origins mismatch

**Solution:**
1. Backend CORS headers are configured
2. Verify frontend is using correct backend URL
3. Check network request headers in DevTools
4. If still failing, check Supabase CORS settings

---

## 🎉 Success!

Your MUSTO application is now live on Vercel!

### Next Steps:

1. **Share your app:** Send the frontend URL to friends
2. **Set up custom domain:** In Vercel Dashboard → Settings → Domains
3. **Enable analytics:** In Vercel Dashboard → Analytics
4. **Set up monitoring:** Monitor logs in Vercel Dashboard

### Useful Commands for Future Deployments:

```bash
# Redeploy after code changes
git push origin main
# Vercel auto-deploys from GitHub!

# View logs
vercel logs

# Check deployment status
vercel deployments

# Update environment variables
vercel env
```

---

## 📞 Need Help?

- **Vercel Issues:** Check [Vercel Docs](https://vercel.com/docs)
- **Supabase Issues:** Check [Supabase Docs](https://supabase.com/docs)
- **Code Issues:** Check `DEPLOYMENT_CHECKLIST.md` in this project

---

**Happy Deploying! 🚀**
