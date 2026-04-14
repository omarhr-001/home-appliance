# Home Appliance Store - Setup Guide

This is a monorepo project containing a React frontend application and a Node.js/Express API server.

## Prerequisites

- Node.js 18+ and pnpm 10+
- Supabase account (for authentication and database)

## Project Structure

```
.
├── artifacts/
│   ├── home-appliance-store/     # React frontend (Vite + React)
│   ├── api-server/               # Express API server
│   └── mockup-sandbox/           # Mockup playground
├── lib/
│   ├── api-client-react/         # React API client (auto-generated)
│   ├── api-spec/                 # API specification
│   └── api-zod/                  # Zod schemas for API
└── pnpm-workspace.yaml           # Workspace configuration
```

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

#### Frontend (artifacts/home-appliance-store/.env)

```bash
# Add your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# API Server URL
VITE_API_URL=http://localhost:3001
```

#### API Server (artifacts/api-server/.env.development.local)

The PORT is already set to 3001. If using Supabase, add:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

### 3. Run the Applications

Open two terminal windows:

**Terminal 1 - API Server:**

```bash
pnpm -C artifacts/api-server dev
```

The API server will start on `http://localhost:3001`

**Terminal 2 - Frontend:**

```bash
pnpm -C artifacts/home-appliance-store dev
```

The frontend will start on `http://localhost:5173`

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **API Server:** http://localhost:3001

## Available Scripts

### Root Level

```bash
pnpm build          # Build all packages
pnpm typecheck      # Type check all packages
```

### Frontend (home-appliance-store)

```bash
pnpm -C artifacts/home-appliance-store dev        # Start dev server
pnpm -C artifacts/home-appliance-store build      # Build for production
pnpm -C artifacts/home-appliance-store typecheck  # Type check
```

### API Server

```bash
pnpm -C artifacts/api-server dev        # Start with hot reload
pnpm -C artifacts/api-server build      # Build for production
pnpm -C artifacts/api-server typecheck  # Type check
```

## Technology Stack

### Frontend

- **React 19** - UI framework
- **Vite 7** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router (Wouter)** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Supabase** - Authentication and database
- **shadcn/ui** - Component library

### Backend

- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **Supabase** - PostgreSQL database
- **Pino** - Logging
- **Multer** - File uploads
- **CORS** - Cross-origin requests

## Project Features

- User authentication with Supabase
- Product catalog with filtering
- Shopping cart management
- Order checkout and processing
- User order history
- Admin dashboard for managing products and orders
- Image upload support
- Role-based access control

## Troubleshooting

### Port Already in Use

If port 3001 or 5173 is already in use, you can change them in:
- API Server: `artifacts/api-server/.env.development.local` (PORT variable)
- Frontend: `.env.development.local` (PORT variable) and `artifacts/home-appliance-store/vite.config.ts`

### Supabase Connection Issues

Ensure your Supabase credentials are correct:
1. Visit https://supabase.com
2. Create or select your project
3. Copy the Project URL and Anon Key from Settings → API
4. Update your `.env` files

### Build Errors

```bash
# Clear dependencies and rebuild
pnpm install
pnpm build
```

## API Documentation

The API server provides the following endpoints:

- `GET /health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /products` - List products
- `GET /products/:id` - Get product details
- `POST /cart` - Add to cart
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details
- `GET /admin/orders` - Admin: List all orders
- `GET /admin/dashboard` - Admin: Dashboard statistics

## Contributing

Make sure to:

1. Run type checks: `pnpm typecheck`
2. Build before committing: `pnpm build`
3. Test locally before pushing changes

## License

MIT
