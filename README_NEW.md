# Home Appliance Store

Une application de boutique d'électroménagers avec une architecture frontend/backend séparée.

## Structure du Projet

```
home-appliance/
├── frontend/          # Application React/Vite
├── backend/           # Serveur Express
└── package.json       # Configuration du workspace pnpm
```

## Installation

### Prérequis

- Node.js 18+ 
- pnpm 8+

### Étapes d'installation

```bash
# 1. Installer les dépendances
pnpm install

# 2. Les fichiers .env sont déjà configurés
```

## Démarrage du Développement

### Démarrer les deux services en parallèle

```bash
pnpm dev
```

Cela démarre:
- Frontend sur `http://localhost:5173`
- Backend sur `http://localhost:3001`

### Démarrer les services individuellement

**Frontend:**
```bash
cd frontend
pnpm dev
```

**Backend:**
```bash
cd backend
pnpm dev
```

## Build

```bash
pnpm build
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/products` - Liste des produits

## Structure des Fichiers

### Frontend
```
frontend/
├── src/
│   ├── components/      # Navbar, Footer, Layout
│   ├── pages/          # Home, Products, NotFound
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

### Backend
```
backend/
├── src/
│   └── index.ts        # Serveur Express
├── build.ts
├── tsconfig.json
└── package.json
```

## Technos

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, React Router
- **Backend**: Express.js, TypeScript, CORS, Cookie Parser
- **Build**: pnpm workspaces
