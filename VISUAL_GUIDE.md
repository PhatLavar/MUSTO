# 🎨 MUSTO Deployment Visual Guide

Simple diagrams and visuals for understanding the deployment process.

## 1️⃣ Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR MUSTO PROJECTS                       │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
          ┌─────────▼────────┐  ┌──────▼──────────┐
          │     FRONTEND     │  │     BACKEND     │
          │  (Vite + React)  │  │  (Next.js API)  │
          │  → Vercel Deploy │  │  → Vercel Deploy│
          └──────────────────┘  └─────────────────┘
                    │                   │
                    │                   ▼
                    │          ┌────────────────┐
                    │          │    Supabase    │
                    │          │   PostgreSQL   │
                    └─────────►│   + Storage    │
                               └────────────────┘
```

## 2️⃣ Deployment Flow (Choose One)

### 🟢 Option A: Vercel Dashboard (Easiest)

```
Step 1: Push Code to GitHub
   git push origin main
           │
           ▼
Step 2: Go to vercel.com
   Click "Add New Project"
           │
           ├──────────────────┬──────────────────┐
           │                  │                  │
           ▼                  ▼                  ▼
     Select Repo        Auto-detect         Choose Root Dir
                         Monorepo                │
                                        ┌────────┴────────┐
                                        │                 │
                                      BACKEND          FRONTEND
                                     (root: backend)  (root: frontend)
           │
           ├──────────────────┬──────────────────┐
           │                  │                  │
           ▼                  ▼                  ▼
        Set Env Vars      Set Env Vars        Deploy!
         (Supabase)      (Backend URL)          │
                                                ▼
                                          🎉 LIVE! 🎉
```

### 🟢 Option B: Vercel CLI (Fast)

```
Step 1: Install Vercel
   npm i -g vercel
           │
           ▼
Step 2: Login
   vercel login
           │
           ▼
Step 3: Deploy Backend
   cd backend && vercel --prod
           │
           ▼
Step 4: Deploy Frontend
   cd frontend && vercel --prod
           │
           ▼
       🎉 LIVE! 🎉
```

## 3️⃣ Environment Variables Flow

```
SUPABASE DASHBOARD
    │
    ├─► SUPABASE_URL ──────────┐
    │                          │
    └─► SUPABASE_ANON_KEY ─────┤
                               │
                    ┌──────────▼───────────┐
                    │  VERCEL DASHBOARD   │
                    │  (Backend Project)  │
                    │                     │
                    │  Env Variables:     │
                    │  • SUPABASE_URL     │
                    │  • SUPABASE_ANON_KEY│
                    └─────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  BACKEND API         │
                    │  (Next.js on Vercel) │
                    └──────────────────────┘
                               │
                    Backend URL (copy it!)
                               │
                    ┌──────────▼───────────┐
                    │  VERCEL DASHBOARD   │
                    │ (Frontend Project)  │
                    │                     │
                    │  Env Variable:      │
                    │  • VITE_API_BASE_URL│
                    └─────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  FRONTEND WEBSITE    │
                    │  (React on Vercel)   │
                    │  → Users access here │
                    └──────────────────────┘
```

## 4️⃣ API Flow (How It Works)

```
USER CLICKS BUTTON IN BROWSER
           │
           ▼
  FRONTEND (React) sends request
           │
           ▼
  GET https://musto-backend-xyz.vercel.app/api/todos
           │
           ▼
  BACKEND (Next.js) receives request
           │
           ▼
  Query Supabase Database
           │
           ▼
  Return JSON response
           │
           ▼
  FRONTEND updates UI
           │
           ▼
  USER SEES DATA! ✅
```

## 5️⃣ File Organization

```
MUSTO/
├── 📄 README.md              ← You are here!
├── 📄 GETTING_STARTED.md     ← Step-by-step guide
├── 📄 VERCEL_QUICK_START.md  ← 5-min reference
├── 📄 VERCEL_DEPLOYMENT_GUIDE.md ← Detailed help
│
├── 📁 backend/               ← Next.js API
│   ├── app/api/
│   │   ├── health/          ← Ping to check if running
│   │   ├── todos/           ← Create/read/update todos
│   │   ├── notes/           ← Create/read/update notes
│   │   └── upload/          ← Upload files
│   └── lib/supabase.ts      ← Database connection
│
├── 📁 frontend/              ← React + Vite
│   ├── src/
│   │   ├── pages/           ← Page components
│   │   ├── features/        ← Todo & Note features
│   │   ├── components/      ← Reusable components
│   │   └── lib/api.ts       ← API client
│   └── public/              ← Images, icons
│
└── 📄 vercel.json           ← Vercel config (monorepo)
```

## 6️⃣ Step-By-Step Checklist

### Pre-Deployment (5 minutes)
```
☐ Code committed to GitHub
  git add .
  git commit -m "Ready for deployment"
  git push origin main

☐ Got SUPABASE_URL
  → Supabase Dashboard → Settings → API → Project URL

☐ Got SUPABASE_ANON_KEY
  → Supabase Dashboard → Settings → API → anon key

☐ Verified local build works
  → backend: npm run build ✓
  → frontend: npm run build ✓
```

### Vercel Dashboard Setup (5 minutes)
```
☐ Go to vercel.com and log in
☐ Click "Add New Project"
☐ Select GitHub repo
☐ Configure BACKEND:
   ├─ Root directory: backend
   ├─ Build: npm run build
   ├─ Output: .next
   └─ Env vars:
      ├─ SUPABASE_URL
      └─ SUPABASE_ANON_KEY
☐ Click "Deploy" → Wait 2-3 min
☐ Copy backend URL from deployment
☐ Configure FRONTEND:
   ├─ Root directory: frontend
   ├─ Build: npm run build
   ├─ Output: dist
   └─ Env vars:
      └─ VITE_API_BASE_URL = [backend URL from above]
☐ Click "Deploy" → Wait 2-3 min
```

### Post-Deployment (5 minutes)
```
☐ Open frontend URL in browser
☐ App loads without 404 errors
☐ Can create a new todo
☐ Can create a new note
☐ Can update/delete items
☐ No errors in browser console (F12)
☐ Success! 🎉
```

## 7️⃣ Troubleshooting Decision Tree

```
App won't load?
│
├─ 404 Error?
│  └─ Check VITE_API_BASE_URL ✓
│
├─ "Failed to fetch todos"?
│  └─ Backend not responding
│     └─ Check SUPABASE_URL & SUPABASE_ANON_KEY ✓
│
├─ "Cannot connect to database"?
│  └─ Wrong Supabase credentials
│     └─ Copy again from Supabase dashboard ✓
│
└─ "Build failed"?
   └─ Code has errors
      └─ Run npm run build locally ✓
```

## 8️⃣ Success Indicators

### ✅ Everything Working!

```
BROWSER (Frontend)
  ├─ Opens without errors
  ├─ Shows MUSTO interface
  ├─ Can click buttons
  └─ Network tab shows:
      GET api/todos → 200 ✓
      GET api/notes → 200 ✓
      POST api/todos → 201 ✓

VERCEL DASHBOARD
  ├─ Backend deployment: SUCCESS ✓
  ├─ Frontend deployment: SUCCESS ✓
  └─ No error logs

DATABASE (Supabase)
  └─ Your data is being saved ✓
```

## 9️⃣ Common URL Formats

```
After deployment, you'll have these URLs:

Backend:
  https://musto-backend-[random].vercel.app/api/todos

Frontend:
  https://musto-frontend-[random].vercel.app

Remember: In frontend env var, use backend URL
WITHOUT trailing slash!
  ✅ https://musto-backend-abc.vercel.app
  ❌ https://musto-backend-abc.vercel.app/
```

## 🔟 Key Concepts Simplified

### What is Vercel?
Hosting platform for web apps. It:
- ✓ Takes your code from GitHub
- ✓ Builds it
- ✓ Hosts it on the internet
- ✓ Gives you a public URL

### What is Supabase?
Database as a service. It:
- ✓ Stores your data (todos, notes)
- ✓ Provides file storage
- ✓ Has free tier (no credit card needed)

### Why environment variables?
- ✓ Keep secrets out of code
- ✓ Different configs for dev/production
- ✓ Secure way to configure apps

### Why monorepo?
- ✓ Frontend and backend in one repo
- ✓ Easier to manage
- ✓ Deploy both together

---

## 🎯 Next Steps

1. **Understand:** Check [GETTING_STARTED.md](./GETTING_STARTED.md)
2. **Verify:** Use checklist above
3. **Deploy:** Follow [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
4. **Test:** Use success indicators above
5. **Share:** Send your URL to friends! 🎉

---

**Good luck! 🚀**
