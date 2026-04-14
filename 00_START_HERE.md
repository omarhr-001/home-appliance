# 🎯 START HERE - Home Appliance Store

Welcome! This document guides you through getting the Home Appliance Store project running.

---

## ⚡ Super Quick Start (5 minutes)

### 1️⃣ Create Environment File
```bash
cd artifacts/home-appliance-store
cp .env.example .env
```

### 2️⃣ Add Your Supabase Credentials
Edit `artifacts/home-appliance-store/.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:3001
```

Don't have Supabase? Get it free at https://supabase.com

### 3️⃣ Run the Project
```bash
cd ../..
pnpm install
./start.sh
```

### ✅ Done!
- Frontend: http://localhost:5173
- API: http://localhost:3001

---

## 📚 Documentation Roadmap

Choose your path:

### 🏃 **I want to start NOW**
→ You're already doing it! Keep going above ☝️

### 🧠 **I want to understand the project**
→ Read [PROJECT_STATUS.md](./PROJECT_STATUS.md)

### 📖 **I want detailed setup instructions**
→ Read [SETUP.md](./SETUP.md)

### 🔍 **I want to see what was configured**
→ Read [CHANGES.md](./CHANGES.md)

### ✓ **I want to verify everything works**
→ Use [VERIFICATION.md](./VERIFICATION.md)

### 🗂️ **I want to find something specific**
→ Use [INDEX.md](./INDEX.md) - complete documentation index

---

## 🎓 Learning Resources

| Document | Time | Best For |
|----------|------|----------|
| **00_START_HERE.md** | 2 min | You are here! |
| **QUICK_START.md** | 5 min | Quick setup & commands |
| **README_GETTING_STARTED.md** | 5 min | Project overview |
| **SETUP.md** | 10 min | Detailed setup |
| **PROJECT_STATUS.md** | 7 min | What was configured |
| **VERIFICATION.md** | 8 min | Verifying everything |
| **RESOURCES.md** | 10 min | External resources |
| **INDEX.md** | 5 min | Finding documents |

---

## ❓ Frequently Asked Questions

### Q: Do I need Supabase?
**A:** Yes, but it's free. Get it at https://supabase.com

### Q: How do I get my Supabase credentials?
**A:** 
1. Create project at supabase.com
2. Go to Settings → API
3. Copy Project URL and Anon Key
4. Paste into `.env` file

### Q: What if I get "Port already in use"?
**A:** Change PORT in `.env.development.local` or kill the process using the port

### Q: How do I fix dependency errors?
**A:** Run `pnpm install` (or `rm -rf node_modules && pnpm install`)

### Q: What if something doesn't work?
**A:** Check [SETUP.md#troubleshooting](./SETUP.md#troubleshooting)

---

## 🚀 Essential Commands

```bash
# Install everything (first time)
pnpm install

# Start both servers
./start.sh

# Type check your code
pnpm typecheck

# Build for production
pnpm build

# View all documentation
See INDEX.md
```

---

## 🎯 Your Next 5 Steps

```
1. Configure Supabase credentials in .env
   └─ 1 minute
   
2. Run: pnpm install
   └─ 2-3 minutes
   
3. Run: ./start.sh
   └─ 30 seconds
   
4. Open: http://localhost:5173
   └─ Instant
   
5. Start exploring!
   └─ Have fun!
```

---

## 📁 Important File Locations

| What | Where |
|------|-------|
| Frontend code | `artifacts/home-appliance-store/src/` |
| Backend code | `artifacts/api-server/src/` |
| Your credentials | `artifacts/home-appliance-store/.env` |
| Config examples | `.env.example` files |
| Documentation | `*.md` files in root |

---

## 💡 Pro Tips

✅ Never commit `.env` files to Git

✅ Always update `.env.example` when adding new variables

✅ Use `pnpm typecheck` before submitting code

✅ Hot reload works automatically (no need to restart)

✅ Check browser console for error messages

---

## 🆘 Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Module not found | Run `pnpm install` |
| Port in use | Change PORT in `.env.development.local` |
| API won't connect | Check `VITE_API_URL` in `.env` |
| TypeScript errors | Run `pnpm typecheck` |
| Supabase errors | Check credentials in `.env` |

For detailed troubleshooting, see [SETUP.md](./SETUP.md#troubleshooting)

---

## 🗺️ Project Overview

```
Home Appliance Store
├── Frontend (React)
│   ├── Product catalog
│   ├── Shopping cart
│   ├── User authentication
│   └── Order management
│
└── Backend (Express)
    ├── API endpoints
    ├── Authentication
    ├── Product management
    └── Order processing
```

**Database:** PostgreSQL via Supabase

---

## 🌐 Access Points

Once running:

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:3001 |
| Health Check | http://localhost:3001/health |

---

## ✅ Verification Checklist

Before you proceed, verify:

- [ ] Node.js 18+ installed
- [ ] pnpm installed
- [ ] Supabase account created
- [ ] `.env` file created with credentials
- [ ] `pnpm install` completed without errors
- [ ] `./start.sh` runs both servers
- [ ] Frontend loads at http://localhost:5173
- [ ] No errors in browser console

---

## 📞 Where to Get Help

1. **Quick answers:** Check FAQ above
2. **Setup issues:** Read [SETUP.md](./SETUP.md)
3. **Commands:** See [QUICK_START.md](./QUICK_START.md)
4. **External resources:** Check [RESOURCES.md](./RESOURCES.md)
5. **Full index:** Use [INDEX.md](./INDEX.md)

---

## 🎉 Ready?

**Let's go!**

```bash
# 1. Setup
cd artifacts/home-appliance-store
cp .env.example .env
# Edit .env with your Supabase credentials

# 2. Install
cd ../..
pnpm install

# 3. Run
./start.sh

# 4. Access
# Open http://localhost:5173 in your browser!
```

---

## 📝 Document Guide

| File | Purpose |
|------|---------|
| **00_START_HERE.md** | ← You are here |
| **QUICK_START.md** | 3-step quick setup |
| **SETUP.md** | Complete guide |
| **INDEX.md** | Documentation index |
| **RESOURCES.md** | External resources |
| **VERIFICATION.md** | Verification checklist |
| **PROJECT_STATUS.md** | Project overview |
| **CHANGES.md** | Configuration changes |

---

## 🎓 Next Steps After Setup

1. ✅ Frontend is running? Great!
2. ✅ Can access http://localhost:5173? Perfect!
3. → Now explore the [SETUP.md](./SETUP.md) for detailed info
4. → Read [RESOURCES.md](./RESOURCES.md) for external docs
5. → Check [PROJECT_STATUS.md](./PROJECT_STATUS.md) for feature list

---

## 🏆 You've Got This!

Everything is configured and ready. The project will work if you follow the 3 steps above.

**Questions?** Check [INDEX.md](./INDEX.md) to find the right document.

**Happy coding!** 🚀

---

**Pro Tip:** Bookmark [INDEX.md](./INDEX.md) for quick access to all documentation.

**Status:** ✅ Ready to develop  
**Last Updated:** 2026-04-14
