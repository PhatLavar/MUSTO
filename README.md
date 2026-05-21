# MUSTO - Todos & Notes Manager

A modern, full-stack application for managing todos and notes with real-time synchronization powered by Supabase.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 🌟 Features

- ✅ **Todos Management** - Create, update, delete, and track todos
- 📝 **Notes Management** - Rich note-taking with file attachments
- 📁 **File Upload** - Upload and manage files with notes
- 🔐 **Secure** - Powered by Supabase with RLS policies
- 🎨 **Modern UI** - Beautiful interface built with React & Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized frontend with Vite
- 🚀 **Easy Deployment** - Ready for Vercel with one-click deployment

## 📋 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **TypeScript** - Type safety

### Backend
- **Next.js 16** - React framework with API routes
- **Supabase** - PostgreSQL database & authentication
- **TypeScript** - Type safety

### Infrastructure
- **Vercel** - Deployment platform
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd MUSTO
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Setup environment variables**

Backend (`backend/.env.local`):
```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Frontend (`frontend/.env.local`):
```env
VITE_API_BASE_URL=http://localhost:3000
```

4. **Setup Supabase Database**

Create the following tables in your Supabase project:

**todos table:**
```sql
create table todos (
  id bigint primary key generated always as identity,
  title text not null,
  is_completed boolean default false,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);
```

**notes table:**
```sql
create table notes (
  id bigint primary key generated always as identity,
  title text not null,
  content text default '',
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);
```

**note_files table:**
```sql
create table note_files (
  id bigint primary key generated always as identity,
  note_id bigint references notes(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_type text,
  file_size bigint,
  created_at timestamp default current_timestamp
);
```

**Create storage bucket:**
- Go to Storage → Create new bucket
- Name: `note-files`
- Make it public

5. **Run development servers**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the frontend.

## 📖 Project Structure

```
MUSTO/
├── backend/                 # Next.js API backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   │   ├── health/     # Health check endpoint
│   │   │   ├── todos/      # Todos CRUD endpoints
│   │   │   ├── notes/      # Notes CRUD endpoints
│   │   │   ├── upload/     # File upload endpoint
│   │   │   └── note-files/ # Note files management
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── lib/
│   │   └── supabase.ts     # Supabase client
│   ├── next.config.ts      # Next.js configuration
│   └── package.json
│
├── frontend/               # Vite + React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── features/       # Feature modules
│   │   ├── pages/          # Page components
│   │   ├── lib/
│   │   │   ├── api.ts      # API client
│   │   │   └── storage.ts  # Local storage utilities
│   │   ├── App.tsx         # Root App component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   ├── vite.config.ts      # Vite configuration
│   └── package.json
│
├── docs/                   # Documentation
├── vercel.json            # Vercel configuration
├── DEPLOYMENT.md          # Deployment guide
├── DEPLOYMENT_CHECKLIST.md # Pre-deployment checklist
├── FIXES_SUMMARY.md       # Summary of fixes
└── README.md              # This file
```

## 🔌 API Endpoints

### Health
- `GET /api/health` - Health check

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

### Notes
- `GET /api/notes` - Get all notes with files
- `POST /api/notes` - Create a new note
- `PATCH /api/notes/[id]` - Update a note
- `DELETE /api/notes/[id]` - Delete a note

### File Management
- `POST /api/upload` - Upload a file
- `POST /api/note-files` - Create a note file record

## 🛠️ Development Commands

### Backend
```bash
cd backend

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint
```

### Frontend
```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🚀 Deployment to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Import in Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Select your GitHub repository
   - Create one project for the backend first, then create a second project for the frontend

3. **Configure Backend Project**
   - Select root directory: `backend`
   - Build command: `npm run build`
   - Output directory: `.next`
   - Environment variables:
     - `SUPABASE_URL`: Your Supabase URL
     - `SUPABASE_ANON_KEY`: Your Supabase anon key

4. **Configure Frontend Project**
   - Select root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables:
     - `VITE_API_BASE_URL`: Your deployed backend URL (e.g., `https://musto-backend.vercel.app`)

5. **Deploy**
   - Deploy the backend first
   - Copy the backend URL
   - Add that URL to the frontend as `VITE_API_BASE_URL`
   - Deploy the frontend

### Method 2: Using Vercel CLI

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
# From project root
vercel --prod
```

4. **Follow prompts to configure**

## 📝 Environment Variables

### Backend (.env.local)
```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

### Frontend (.env.local)
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```

For production, use:
```env
# .env.production.local
VITE_API_BASE_URL=https://your-backend.vercel.app
```

## 🐛 Troubleshooting

### Frontend shows 404 errors
- ✅ Make sure `VITE_API_BASE_URL` is set correctly
- ✅ Backend URL should not have trailing slash
- ✅ Check if backend is running and accessible

### Supabase connection errors
- ✅ Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- ✅ Check that tables exist in your Supabase project
- ✅ Verify RLS policies allow public access

### CORS errors
- ✅ Backend has CORS headers configured in `next.config.ts`
- ✅ Make sure frontend is sending `Content-Type: application/json` header

### Build errors
- ✅ Delete `node_modules` and run `npm install` again
- ✅ Delete `.next` and `dist` directories
- ✅ Check for TypeScript errors: `npm run build`

### File upload not working
- ✅ Verify `note-files` bucket exists in Supabase Storage
- ✅ Check bucket is set to public
- ✅ Verify RLS policies on bucket

## 📚 Useful Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev)

## 🔒 Security

- Never commit `.env.local` files (already in `.gitignore`)
- Use `.env.example` as a template
- Rotate Supabase keys regularly
- Enable RLS policies in Supabase
- Use environment variables for sensitive data

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, React, Supabase, and Vercel**

Last Updated: 2026-05-21
