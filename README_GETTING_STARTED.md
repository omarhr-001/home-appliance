# 🏪 Home Appliance Store - Getting Started

Welcome to the Home Appliance Store project! This is a full-stack e-commerce application built with React and Express.

## 🚀 Quick Start (3 Steps)

### Step 1: Configure Environment
```bash
cd artifacts/home-appliance-store
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:3001
```

### Step 2: Install Dependencies
```bash
cd ../..
pnpm install
```

### Step 3: Start Development
```bash
./start.sh
```

**That's it!** Access your application at:
- 🌐 **Frontend:** http://localhost:5173
- 🔌 **API:** http://localhost:3001

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[INDEX.md](./INDEX.md)** | 📖 Complete documentation index |
| **[QUICK_START.md](./QUICK_START.md)** | ⚡ Fast setup & essential commands |
| **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** | ✅ Project overview & status |
| **[SETUP.md](./SETUP.md)** | 🔧 Comprehensive setup guide |
| **[VERIFICATION.md](./VERIFICATION.md)** | ✓ Verification checklist |
| **[CHANGES.md](./CHANGES.md)** | 📝 Configuration changes made |
| **[RESOURCES.md](./RESOURCES.md)** | 📚 External resources & references |

---

## 🎯 What's Included

### Frontend (React)
- ✅ Product catalog with filtering
- ✅ Shopping cart management
- ✅ User authentication via Supabase
- ✅ Order checkout and tracking
- ✅ Admin dashboard for managing products & orders
- ✅ Responsive design with Tailwind CSS

### Backend (Express)
- ✅ RESTful API endpoints
- ✅ User authentication and authorization
- ✅ Product management
- ✅ Order processing
- ✅ Admin functionality
- ✅ File upload support

### Database
- ✅ PostgreSQL via Supabase
- ✅ Automatic schema management with Drizzle ORM
- ✅ Row-level security (RLS) support

---

## 🛠️ Technology Stack

```
Frontend              Backend               Database
├─ React 19          ├─ Express 5          ├─ PostgreSQL
├─ Vite 7            ├─ TypeScript         └─ Supabase
├─ Tailwind CSS      ├─ Drizzle ORM
├─ React Query       ├─ Multer
├─ React Hook Form   ├─ CORS
├─ Wouter Router     └─ Pino (Logging)
├─ Supabase Auth
└─ shadcn/ui
```

---

## 📋 Requirements

- **Node.js** 18+ (Check: `node --version`)
- **pnpm** 10+ (Check: `pnpm --version`)
- **Supabase Account** (Free tier available at supabase.com)

### Install pnpm (if needed)
```bash
npm install -g pnpm
```

---

## 🔑 Getting Supabase Credentials

1. Visit [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to **Settings → API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Key** → `VITE_SUPABASE_ANON_KEY`

---

## 🎮 Running the Project

### Using the Startup Script (Recommended)
```bash
./start.sh
```

### Manual Startup (Two Terminal Windows)

**Terminal 1 - API Server:**
```bash
pnpm -C artifacts/api-server dev
```

**Terminal 2 - Frontend:**
```bash
pnpm -C artifacts/home-appliance-store dev
```

---

## 📂 Project Structure

```
home-appliance/
├── artifacts/
│   ├── home-appliance-store/     # React Frontend
│   │   └── src/
│   │       ├── pages/            # Page components
│   │       ├── components/       # Reusable UI components
│   │       ├── contexts/         # Auth context
│   │       └── lib/              # Utilities
│   │
│   └── api-server/               # Express Backend
│       └── src/
│           ├── routes/           # API endpoints
│           └── middlewares/      # Express middleware
│
├── lib/
│   ├── api-client-react/         # Generated API client
│   ├── api-spec/                 # OpenAPI specification
│   └── api-zod/                  # Validation schemas
│
├── QUICK_START.md                # Quick setup guide
├── SETUP.md                      # Complete setup guide
├── INDEX.md                      # Documentation index
└── start.sh                      # Startup script
```

---

## 🚀 Next Steps

1. **Review Documentation**
   - Start with [QUICK_START.md](./QUICK_START.md) for a quick overview
   - Read [SETUP.md](./SETUP.md) for detailed instructions

2. **Set Up Environment**
   - Create `.env` file from `.env.example`
   - Add your Supabase credentials

3. **Start Development**
   - Run `pnpm install`
   - Run `./start.sh`

4. **Explore Features**
   - Visit http://localhost:5173
   - Register a new account
   - Browse products and test features

5. **Start Building**
   - Frontend: `artifacts/home-appliance-store/src/`
   - Backend: `artifacts/api-server/src/`

---

## 📖 Full Documentation

For comprehensive guides and detailed information:

- **📚 [View Complete Documentation Index](./INDEX.md)**
- **⚡ [Quick Start Guide](./QUICK_START.md)**
- **🔧 [Complete Setup Guide](./SETUP.md)**
- **✅ [Verification Checklist](./VERIFICATION.md)**

---

## ⚙️ Available Commands

```bash
# Install dependencies
pnpm install

# Start both servers
./start.sh

# Type check
pnpm typecheck

# Build for production
pnpm build

# Start API server only
pnpm -C artifacts/api-server dev

# Start frontend only
pnpm -C artifacts/home-appliance-store dev
```

See [QUICK_START.md](./QUICK_START.md) for more commands.

---

## 🐛 Troubleshooting

### Port Already in Use
Change the PORT in `.env.development.local` or `.env`

### Missing Supabase Credentials
Add them to `artifacts/home-appliance-store/.env`

### Dependencies Not Installing
```bash
rm -rf node_modules
pnpm install
```

### API Connection Issues
- Ensure API server is running on port 3001
- Check `VITE_API_URL` in `.env`
- Look for CORS errors in browser console

For more help, see [SETUP.md#troubleshooting](./SETUP.md#troubleshooting)

---

## 🎯 Key Features

### User Features
- ✨ Browse product catalog
- 🛒 Add to shopping cart
- 📦 Checkout and place orders
- 📋 View order history
- 👤 Manage user profile

### Admin Features
- 📊 Dashboard with statistics
- 📦 Product management
- 📦 Order management
- 📈 Analytics

### API
- 🔐 JWT authentication
- 🛡️ Role-based access control
- 📱 RESTful endpoints
- 🔄 Real-time order status

---

## 🔗 External Resources

- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **Supabase:** https://supabase.com
- **Tailwind CSS:** https://tailwindcss.com
- **Express:** https://expressjs.com

See [RESOURCES.md](./RESOURCES.md) for more links.

---

## 💡 Tips for Success

✅ **Always check `.env.example` files** when adding new environment variables

✅ **Run `pnpm typecheck` before committing** code

✅ **Never commit `.env` files** with sensitive credentials

✅ **Use HMR for development** - changes reload automatically

✅ **Read the documentation** - everything is well documented!

---

## 📞 Need Help?

1. Check the documentation: [INDEX.md](./INDEX.md)
2. Review troubleshooting: [SETUP.md#troubleshooting](./SETUP.md#troubleshooting)
3. Verify setup: [VERIFICATION.md](./VERIFICATION.md)
4. Check external resources: [RESOURCES.md](./RESOURCES.md)

---

## ✅ Project Status

**Status:** ✅ Ready for Development

All configurations are in place and the project is ready to run!

- ✅ Environment variables configured
- ✅ API communication setup
- ✅ Database ready
- ✅ Documentation complete
- ✅ All dependencies available

---

## 🎉 Ready to Begin?

```bash
# 1. Configure Supabase
cd artifacts/home-appliance-store
cp .env.example .env
# Edit .env with your credentials

# 2. Install dependencies
cd ../..
pnpm install

# 3. Start development
./start.sh
```

**Open http://localhost:5173 in your browser!** 🚀

---

**Questions?** Check [INDEX.md](./INDEX.md) for the complete documentation index.

**Last Updated:** 2026-04-14  
**Prepared by:** v0 AI Assistant
