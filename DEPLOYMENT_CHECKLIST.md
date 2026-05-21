# MUSTO Deployment Checklist

## ✅ Issues Fixed

### Backend (Next.js API)
- [x] Updated metadata title and description in `layout.tsx`
- [x] Added CORS configuration in `next.config.ts`
- [x] Fixed `.maybeSingle()` usage in DELETE endpoint for error handling
- [x] Created `.env.example` with required variables
- [x] All API routes have proper error handling and CORS headers

### Frontend (Vite + React)
- [x] Fixed `API_BASE_URL` to use environment variable `VITE_API_BASE_URL`
- [x] Created `.env.example` for configuration
- [x] Fixed `tsconfig.json` trailing comma issue
- [x] Updated `index.html` with proper title and metadata

### Project Configuration
- [x] Created `vercel.json` for monorepo deployment
- [x] Created `DEPLOYMENT.md` with setup instructions
- [x] Verified `.gitignore` properly excludes `.env*` files

## 🔍 Verification Checklist

Before deploying to Vercel:

1. **Environment Variables**
   - [ ] Backend: Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel
   - [ ] Frontend: Set `VITE_API_BASE_URL` to your backend URL
   - [ ] Never commit `.env.local` files

2. **Database Setup**
   - [ ] Supabase project created
   - [ ] Tables exist: `todos`, `notes`, `note_files`
   - [ ] Public anon key has proper RLS policies

3. **Build Test**
   - [ ] `npm run build` works in backend directory
   - [ ] `npm run build` works in frontend directory
   - [ ] No TypeScript errors

4. **API Endpoints**
   - [ ] GET `/api/health` - returns status
   - [ ] GET `/api/todos` - returns todos
   - [ ] POST `/api/todos` - creates todo
   - [ ] PATCH `/api/todos/[id]` - updates todo
   - [ ] DELETE `/api/todos/[id]` - deletes todo
   - [ ] GET `/api/notes` - returns notes
   - [ ] POST `/api/notes` - creates note
   - [ ] PATCH `/api/notes/[id]` - updates note
   - [ ] DELETE `/api/notes/[id]` - deletes note
   - [ ] POST `/api/upload` - uploads file
   - [ ] POST `/api/note-files` - creates note file record

5. **CORS Settings**
   - [ ] All API endpoints return proper CORS headers
   - [ ] Frontend can make requests to backend API

## 📋 Common 404 Issues Fixed

1. **Hardcoded API URL** → Now uses environment variable
2. **Missing error handling** → Added proper error responses
3. **Improper query methods** → Fixed `.single()` to `.maybeSingle()`
4. **Invalid JSON in tsconfig** → Fixed trailing comma
5. **Generic page titles** → Updated with meaningful titles

## 🚀 Deployment Commands

```bash
# Build and test locally
npm install
npm run build

# Deploy to Vercel
vercel --prod
```

## 🔗 Resources
- Backend API Docs: See `backend/` directory
- Frontend Docs: See `frontend/` directory
- Deployment Guide: See `DEPLOYMENT.md`
