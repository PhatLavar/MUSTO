# 📚 MUSTO Getting Started Guide

Welcome to MUSTO! This guide will help you get up and running in no time.

## 🎯 Your Journey

```
1. Clone Project (2 mins)
   ↓
2. Setup Local Dev (5 mins)
   ↓
3. Run Locally (2 mins)
   ↓
4. Deploy to Vercel (10 mins)
   ↓
5. Share Your App! 🎉
```

---

## Step 1: Clone the Project (2 mins)

```bash
# Clone from GitHub
git clone https://github.com/PhatLavar/MUSTO.git
cd MUSTO

# Verify structure
ls  # Should see: backend, frontend, README.md, etc.
```

---

## Step 2: Setup Local Development (5 mins)

### Backend Setup
```bash
cd backend
npm install
```

Create `.env.local`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_from_supabase
```

### Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

✅ Both folders should have `node_modules` now

---

## Step 3: Run Locally (2 mins)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
✅ Should see: "Ready on http://localhost:3000"

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
✅ Should see: "VITE v8.0.10 ready in XXXms"

**Open Browser:**
Go to `http://localhost:5173` and you should see the MUSTO app!

---

## Step 4: Deploy to Vercel (10 mins)

### Quickest Way (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready to deploy"
git push origin main
```

2. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Select your GitHub repo
   - Vercel auto-detects monorepo

3. **Deploy Backend**
   - Root directory: `backend`
   - Build: `npm run build`
   - Output: `.next`
   - Add environment variables:
     - `SUPABASE_URL`: Your Supabase URL
     - `SUPABASE_ANON_KEY`: Your Supabase key
   - Click Deploy ✅

4. **Deploy Frontend**
   - Same process, root directory: `frontend`
   - Build: `npm run build`
   - Output: `dist`
   - Add environment variable:
     - `VITE_API_BASE_URL`: Your backend Vercel URL
   - Click Deploy ✅

5. **Done!** Visit your frontend URL 🎉

---

## 📁 Project Structure Overview

```
MUSTO/
├── backend/          # API (Next.js on Vercel)
│   ├── app/api/      # All API endpoints here
│   ├── lib/          # Supabase client
│   └── package.json
│
├── frontend/         # UI (Vite + React on Vercel)
│   ├── src/          # React components & pages
│   ├── public/       # Images, icons
│   └── package.json
│
├── README.md         # Full documentation
├── VERCEL_DEPLOYMENT_GUIDE.md    # Detailed deploy steps
└── VERCEL_QUICK_START.md         # Quick reference
```

---

## 🔑 5 Key Files You Need to Know

1. **`frontend/src/lib/api.ts`**
   - All API calls are here
   - Uses environment variable for backend URL

2. **`backend/app/api/todos/route.ts`**
   - Todo endpoints (GET, POST)
   - Connected to Supabase

3. **`backend/app/api/notes/route.ts`**
   - Note endpoints (GET, POST)
   - Connected to Supabase

4. **`vercel.json`**
   - Tells Vercel about your monorepo
   - No editing needed!

5. **`.env.local` (don't commit!)**
   - Keep secrets here
   - Already in .gitignore

---

## 🧪 Testing Your Setup

After running locally, test these:

```bash
# Test backend is running
curl http://localhost:3000/api/health

# Should return:
# {"status":"ok","message":"MUSTO backend is running!"}

# Test frontend loads
# Open http://localhost:5173 in browser
```

---

## 🆘 Common Beginner Issues

### "Cannot find module '@/lib/api'"
- Frontend TypeScript can't find imports
- Solution: Restart `npm run dev` in frontend folder

### "Supabase connection failed"
- Environment variables are wrong or missing
- Solution: Check `.env.local` has correct values from Supabase

### "Frontend shows 404 errors"
- Backend URL is wrong
- Solution: Check `VITE_API_BASE_URL` matches your local backend URL

### "Build fails with TypeScript errors"
- Code has type errors
- Solution: Run `npm run build` locally to see exact error

---

## 📚 Learn More

### Want to understand the code?
- Read [README.md](./README.md) - Full documentation
- Check API endpoints in `backend/app/api/`
- Explore components in `frontend/src/`

### Want to customize it?
- Change colors: Edit `frontend/src/index.css`
- Add features: Add routes to frontend, endpoints to backend
- Modify database: Change Supabase schema and update queries

### Want to deploy to production?
- Follow [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
- It has detailed step-by-step instructions
- Includes troubleshooting tips

---

## ✨ Next Steps After Deploy

1. **Share your app URL** with friends and family
2. **Add custom domain** in Vercel settings
3. **Monitor with Vercel Analytics** in dashboard
4. **Make it your own** - customize design and features
5. **Deploy updates** - just push to main branch!

---

## 🤔 Questions?

1. Check the [README.md](./README.md) for comprehensive docs
2. Review [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for deploy help
3. Check your terminal output for error messages
4. Read Vercel logs in dashboard

---

## 🎉 You've Got This!

You now have everything to run MUSTO locally and deploy it to the world.

**Next: Follow Step 3 above to run locally, then Step 4 to deploy!**

Good luck! 🚀
