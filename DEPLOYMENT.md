# MUSTO - Deployment Guide

## Prerequisites
- Node.js 18+
- Vercel CLI installed: `npm i -g vercel`
- Supabase project with tables: `todos`, `notes`, `note_files`

## Environment Variables Setup

### Backend (Vercel)
Set these environment variables in Vercel dashboard:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase public key

### Frontend (Vercel)
Set this environment variable in Vercel dashboard:
- `VITE_API_BASE_URL` - Your backend API URL (e.g., `https://your-backend.vercel.app`)

## Deployment Steps

### Option 1: Using Vercel Dashboard
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the MUSTO repository
4. Configure both projects (backend and frontend)
5. Add environment variables for each project
6. Deploy

### Option 2: Using Vercel CLI
```bash
# Install dependencies
npm install

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Troubleshooting

### 404 Errors
- Ensure `VITE_API_BASE_URL` is correctly set in frontend environment
- Check API routes are deployed correctly in backend
- Verify Supabase credentials are valid

### CORS Issues
- Backend CORS headers are configured in `next.config.ts`
- Frontend requests should include `Content-Type: application/json`

### Database Errors
- Ensure tables exist in Supabase: `todos`, `notes`, `note_files`
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
