# 🚀 MUSTO Deployment - Quick Reference

## 📋 Pre-Deployment Checklist (5 mins)

```
✅ Code committed to GitHub
✅ Local build works: npm run build (in both backend & frontend)
✅ Supabase tables created: todos, notes, note_files
✅ Supabase storage bucket created: note-files (public)
✅ Got SUPABASE_URL from Supabase dashboard
✅ Got SUPABASE_ANON_KEY from Supabase dashboard
```

## 🎯 Fastest Deployment Path

### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) → "Add New Project"
2. Select GitHub repo → Click Import
3. Set root directory: `backend` → Add env vars → Deploy
4. Do same for frontend with root directory: `frontend`
5. Set `VITE_API_BASE_URL` = your backend URL
6. Done! ✅

### Option B: Vercel CLI (3 commands)
```bash
npm i -g vercel              # Install once
vercel --prod                # Deploy backend
vercel --prod                # Deploy frontend
```

---

## 🔑 Environment Variables Needed

### Backend (next.js on Vercel)
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
```

### Frontend (Vite + React on Vercel)
```
VITE_API_BASE_URL=https://musto-backend-xxxxx.vercel.app
```

**⚠️ Important:** No trailing slash on backend URL!

---

## ✅ After Deployment - Verify (2 mins)

Open browser DevTools (F12) → Network tab

Test these URLs:
- `GET https://your-backend.vercel.app/api/health`
  - Should return: `{"status":"ok",...}`

- `GET https://your-backend.vercel.app/api/todos`
  - Should return: `[]` or array of todos

- Visit your frontend URL
  - Should load without 404 errors
  - Can create todo/note and see data update

---

## 🆘 Quick Troubleshooting

| Issue | Check |
|-------|-------|
| 404 errors on frontend | `VITE_API_BASE_URL` set correctly? |
| Can't fetch todos | Backend `SUPABASE_*` env vars set? |
| Build fails | Run `npm run build` locally to see error |
| Still errors after deploy | Check Vercel deployment logs |

---

## 📞 Helpful Links

- [Full Guide](./VERCEL_DEPLOYMENT_GUIDE.md)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [README](./README.md)

---

**Time to live: ~10 minutes ⚡**
