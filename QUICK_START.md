# Quick Start Guide

## 🚀 Get Running in 3 Steps

### Step 1: Configure Environment (First Time Only)
```bash
cd artifacts/home-appliance-store
cp .env.example .env
```
Then edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 2: Install Dependencies (First Time Only)
```bash
pnpm install
```

### Step 3: Start Development
```bash
./start.sh
```

**Done!** Your application is running at:
- Frontend: http://localhost:5173
- API: http://localhost:3001

---

## Alternative: Manual Startup (Two Terminals)

**Terminal 1 - API Server:**
```bash
pnpm -C artifacts/api-server dev
```

**Terminal 2 - Frontend:**
```bash
pnpm -C artifacts/home-appliance-store dev
```

---

## Essential Commands

### Setup
```bash
# Install all dependencies
pnpm install

# Check for TypeScript errors
pnpm typecheck

# Build for production
pnpm build
```

### Development
```bash
# Start both servers (recommended)
./start.sh

# Start just the API server
pnpm -C artifacts/api-server dev

# Start just the frontend
pnpm -C artifacts/home-appliance-store dev
```

### Frontend Only
```bash
cd artifacts/home-appliance-store

# Start dev server
pnpm dev

# Type check
pnpm typecheck

# Build
pnpm build

# Preview production build
pnpm serve
```

### API Server Only
```bash
cd artifacts/api-server

# Start dev server (compiles and runs)
pnpm dev

# Type check
pnpm typecheck

# Build
pnpm build

# Start production build
pnpm start
```

---

## Environment Variables Quick Reference

### Frontend (.env file)
```
VITE_SUPABASE_URL=        # Required: Your Supabase project URL
VITE_SUPABASE_ANON_KEY=   # Required: Your Supabase anon key
VITE_API_URL=             # Optional: Backend URL (default: http://localhost:3001)
```

### Root (.env.development.local)
```
PORT=5173                 # Frontend port
BASE_PATH=/              # Base path for router
```

### API Server (.env.development.local)
```
PORT=3001                # API server port
```

---

## Getting Supabase Credentials

1. Go to https://supabase.com
2. Sign in or create account
3. Create a new project
4. Go to Settings → API
5. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Key** → `VITE_SUPABASE_ANON_KEY`

---

## Troubleshooting

### "Port already in use"
Change the port in `.env.development.local`:
```
PORT=5174    # Or any available port
```

### "Cannot find module"
```bash
pnpm install
```

### "TypeScript errors"
```bash
pnpm typecheck
```

### "API connection failed"
1. Verify API server is running: `pnpm -C artifacts/api-server dev`
2. Check `VITE_API_URL` in frontend `.env`
3. Look for CORS errors in browser console

---

## File Locations

| What | Where |
|------|-------|
| Frontend code | `artifacts/home-appliance-store/src/` |
| Backend code | `artifacts/api-server/src/` |
| Frontend config | `artifacts/home-appliance-store/.env` |
| Backend config | `artifacts/api-server/.env.development.local` |
| Root config | `.env.development.local` |

---

## Project URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:3001 |
| API Health | http://localhost:3001/health |

---

## Documentation

- **Full Setup:** Read [SETUP.md](./SETUP.md)
- **What Changed:** See [CHANGES.md](./CHANGES.md)
- **Resources:** Check [RESOURCES.md](./RESOURCES.md)
- **Verification:** Use [VERIFICATION.md](./VERIFICATION.md)
- **Status:** Review [PROJECT_STATUS.md](./PROJECT_STATUS.md)

---

## Key Files to Edit

### Frontend Pages
```
artifacts/home-appliance-store/src/pages/
├── home.tsx           # Homepage
├── login.tsx          # Login page
├── register.tsx       # Registration page
├── product-detail.tsx # Product details
├── cart.tsx          # Shopping cart
├── checkout.tsx      # Checkout
└── orders.tsx        # Order history
```

### Backend Routes
```
artifacts/api-server/src/routes/
├── auth.ts           # Authentication endpoints
├── products.ts       # Product endpoints
├── cart.ts          # Cart endpoints
├── orders.ts        # Order endpoints
└── admin.ts         # Admin endpoints
```

### Shared Components
```
artifacts/home-appliance-store/src/components/
├── Navbar.tsx       # Navigation bar
├── Layout.tsx       # Page layout
└── ui/              # shadcn/ui components
```

---

## Useful npm/pnpm Commands

```bash
# Run commands in specific workspace
pnpm -C artifacts/home-appliance-store <command>
pnpm -C artifacts/api-server <command>

# Run in root
pnpm <command>

# List all workspace packages
pnpm ls -r --depth 0
```

---

## Performance Tips

1. **Use HMR** - Changes hot reload automatically
2. **Type Check** - Run before commits: `pnpm typecheck`
3. **Build First** - Test production build: `pnpm build`
4. **Clear Cache** - If issues occur: `rm -rf node_modules && pnpm install`

---

## Next Steps

1. ✅ Add Supabase credentials to `.env`
2. ✅ Run `pnpm install`
3. ✅ Run `./start.sh`
4. ✅ Open http://localhost:5173 in your browser
5. ✅ Start developing!

---

**Happy coding! 🎉**

For detailed information, see [PROJECT_STATUS.md](./PROJECT_STATUS.md) or [SETUP.md](./SETUP.md).
