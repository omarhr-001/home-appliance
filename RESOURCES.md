# Resources & Documentation

## Project Documentation

### Getting Started
- **[SETUP.md](./SETUP.md)** - Complete setup guide and project overview
- **[CHANGES.md](./CHANGES.md)** - Summary of configuration changes made
- **[README.md](./README.md)** - Original project README (if available)

## Development Guides

### Startup
- **[start.sh](./start.sh)** - Convenient development startup script
  ```bash
  chmod +x start.sh
  ./start.sh
  ```

### Manual Startup
```bash
# Terminal 1: Start API Server
pnpm -C artifacts/api-server dev

# Terminal 2: Start Frontend
pnpm -C artifacts/home-appliance-store dev
```

## Environment Configuration

### Frontend Configuration
- **Location:** `artifacts/home-appliance-store/.env`
- **Template:** `artifacts/home-appliance-store/.env.example`
- **Required Variables:**
  - `VITE_SUPABASE_URL` - Supabase project URL
  - `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
  - `VITE_API_URL` - Backend API URL

### API Server Configuration
- **Location:** `artifacts/api-server/.env.development.local`
- **Template:** `artifacts/api-server/.env.example`
- **Default:** PORT=3001

### Root Configuration
- **Location:** `.env.development.local`
- **Contains:** Frontend PORT and BASE_PATH configuration

## External Resources

### Supabase (Authentication & Database)
- **Website:** https://supabase.com
- **Documentation:** https://supabase.com/docs
- **Getting Started:** https://supabase.com/docs/guides/getting-started

### Frontend Technologies
- **React 19:** https://react.dev
- **Vite:** https://vitejs.dev
- **TypeScript:** https://www.typescriptlang.org
- **Tailwind CSS:** https://tailwindcss.com
- **React Hook Form:** https://react-hook-form.com
- **React Query:** https://tanstack.com/query/latest
- **shadcn/ui:** https://ui.shadcn.com

### Backend Technologies
- **Express:** https://expressjs.com
- **Drizzle ORM:** https://orm.drizzle.team
- **Pino (Logging):** https://getpino.io

### Package Management
- **pnpm:** https://pnpm.io
- **pnpm Workspaces:** https://pnpm.io/workspaces

## Project Structure Reference

```
home-appliance/
├── artifacts/
│   ├── home-appliance-store/       # React Frontend
│   │   ├── src/
│   │   │   ├── pages/              # Page components
│   │   │   ├── components/         # Reusable components
│   │   │   ├── contexts/           # Context providers (Auth)
│   │   │   ├── lib/                # Utilities (Supabase config)
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   ├── App.tsx             # Main app component
│   │   │   └── main.tsx            # Entry point
│   │   ├── .env                    # Environment variables
│   │   ├── .env.example            # Environment template
│   │   ├── vite.config.ts          # Vite configuration
│   │   └── package.json            # Frontend dependencies
│   │
│   ├── api-server/                 # Express API
│   │   ├── src/
│   │   │   ├── routes/             # API route handlers
│   │   │   ├── middlewares/        # Express middlewares
│   │   │   ├── lib/                # Utilities
│   │   │   ├── app.ts              # Express app setup
│   │   │   └── index.ts            # Server entry point
│   │   ├── .env.development.local  # Development environment
│   │   ├── .env.example            # Environment template
│   │   └── package.json            # Server dependencies
│   │
│   └── mockup-sandbox/             # Design mockups
│
├── lib/
│   ├── api-client-react/           # Generated API client
│   ├── api-spec/                   # API specification
│   ├── api-zod/                    # Zod validation schemas
│   └── db/                         # Database utilities
│
├── scripts/                        # Build & utility scripts
├── pnpm-workspace.yaml             # Workspace configuration
├── tsconfig.base.json              # Base TypeScript config
├── .env.development.local          # Root environment vars
├── .gitignore                      # Git ignore rules
├── SETUP.md                        # Setup instructions
├── CHANGES.md                      # Configuration changes
├── RESOURCES.md                    # This file
└── start.sh                        # Startup script
```

## Troubleshooting Guide

### Issue: "PORT environment variable is required"
**Solution:** Ensure `.env.development.local` has `PORT=5173` defined

### Issue: "VITE_SUPABASE_URL is not set"
**Solution:** Add Supabase credentials to `artifacts/home-appliance-store/.env`

### Issue: API Server won't start
**Solution:** Check that port 3001 is available or change PORT in `.env.development.local`

### Issue: Frontend can't connect to API
**Solution:** Verify `VITE_API_URL` is set to the correct API server URL

### Issue: Module not found errors
**Solution:** Run `pnpm install` and ensure all dependencies are installed

For more troubleshooting, see [SETUP.md#troubleshooting](./SETUP.md#troubleshooting)

## Quick Commands

### Install Dependencies
```bash
pnpm install
```

### Type Check
```bash
pnpm typecheck
```

### Build All
```bash
pnpm build
```

### Build Frontend Only
```bash
pnpm -C artifacts/home-appliance-store build
```

### Build API Only
```bash
pnpm -C artifacts/api-server build
```

## Development Workflow

### 1. First Time Setup
```bash
pnpm install
cd artifacts/home-appliance-store
cp .env.example .env
# Edit .env and add your Supabase credentials
```

### 2. Start Development Servers
```bash
./start.sh
```

Or manually:
```bash
# Terminal 1
pnpm -C artifacts/api-server dev

# Terminal 2
pnpm -C artifacts/home-appliance-store dev
```

### 3. Access Applications
- Frontend: http://localhost:5173
- API: http://localhost:3001

### 4. Make Changes
- Edit frontend files in `artifacts/home-appliance-store/src/`
- Edit API files in `artifacts/api-server/src/`
- Changes automatically reload with HMR

## Important Notes

- **Never commit .env files** - They contain sensitive credentials
- **Use .env.example** - As a template for new environment variables
- **Update .env.example** - When adding new environment variables
- **Run typecheck before commit** - Catch TypeScript errors early
- **Test both servers** - Ensure frontend and API work together

## Getting Help

### For Configuration Issues
1. Check [SETUP.md](./SETUP.md)
2. Review [CHANGES.md](./CHANGES.md)
3. Check console output for error messages

### For Feature Development
1. Review existing components in the project
2. Follow the established patterns
3. Ensure TypeScript types are correct
4. Run `pnpm typecheck` before submitting changes

### For Supabase Issues
1. Visit https://supabase.com/docs
2. Check your Supabase project dashboard
3. Verify credentials in `.env` file
4. Check database connection status

## Version Information

### Key Dependencies
- React: 19.1.0
- TypeScript: ~5.9.2
- Vite: ^7.3.0
- Express: ^5
- Tailwind CSS: ^4.1.14

For complete dependency information, see `package.json` files in each workspace package.
