# Structure du Projet Simplifié

## Vue d'ensemble

Le projet a été entièrement **régénéré et simplifié** en gardant seulement:
- **Frontend**: Application React/Vite
- **Backend**: Serveur Express.js

Toutes les dépendances complexes et dossiers inutiles ont été supprimés.

## Arborescence

```
home-appliance/
│
├── frontend/                    # Application React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Products.tsx
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx              # Composant principal avec routing
│   │   ├── main.tsx             # Point d'entrée React
│   │   └── index.css            # Styles Tailwind
│   ├── index.html
│   ├── vite.config.ts           # Configuration Vite avec proxy API
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env                     # Variables d'environnement
│   └── .gitignore
│
├── backend/                     # Serveur Express
│   ├── src/
│   │   └── index.ts             # Point d'entrée serveur
│   ├── build.ts                 # Script de build esbuild
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env                     # Variables d'environnement
│   └── .gitignore
│
├── package.json                 # Configuration workspace pnpm
├── pnpm-workspace.yaml          # Configuration workspace
├── .gitignore                   # Gitignore global
├── README_NEW.md                # Documentation principale
├── QUICK_START.txt              # Guide de démarrage rapide
├── start-dev.sh                 # Script de démarrage
└── PROJECT_STRUCTURE.md         # Ce fichier

```

## Détails des Applications

### Frontend (React + Vite)

**Technos:**
- React 19 + TypeScript
- Vite pour le build/dev
- React Router pour le routing
- Tailwind CSS pour les styles
- Axios pour les requêtes HTTP

**Pages:**
1. **Home** (`/`) - Page d'accueil avec présentation
2. **Products** (`/products`) - Liste des produits depuis l'API
3. **NotFound** (`/*`) - Page 404

**Composants:**
- **Layout** - Enveloppe l'application avec Navbar et Footer
- **Navbar** - Navigation principale
- **Footer** - Pied de page

**Proxy API:**
Configuré dans `vite.config.ts` pour proxifier `/api` vers le backend.

### Backend (Express.js)

**Technos:**
- Express.js v5
- TypeScript
- CORS pour les requêtes cross-origin
- esbuild pour la compilation

**Routes:**
- `GET /api/health` - Vérification de santé du serveur
- `GET /api/products` - Liste des produits (données en dur)

**Features:**
- Middleware CORS configuré pour localhost:5173
- Error handling global
- 404 handler

## Configuration Workspace pnpm

**package.json root:**
```json
{
  "workspaces": ["frontend", "backend"],
  "scripts": {
    "dev": "pnpm --parallel -r dev",
    "build": "pnpm -r build"
  }
}
```

Permet de démarrer/builder les deux applications avec une seule commande.

## Variables d'Environnement

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## Démarrage Rapide

```bash
# Installation
pnpm install

# Démarrage développement
pnpm dev

# Build production
pnpm build
```

## Points Clés de la Simplification

1. ✅ Suppression des dossiers inutiles (`lib/`, `scripts/`, `mockup-sandbox/`)
2. ✅ Suppression de toutes les documentations générées
3. ✅ Structure monorepo pnpm minimale et fonctionnelle
4. ✅ Frontend et Backend complètement indépendants
5. ✅ Configuration par défaut prête à fonctionner
6. ✅ Styles Tailwind CSS configurés
7. ✅ Proxy API automatique en développement

## Prochaines Étapes Possibles

Pour étendre le projet:

1. **Ajouter une base de données**: Supabase, PostgreSQL, etc.
2. **Ajouter l'authentification**: Auth0, Supabase Auth, etc.
3. **Améliorer l'API**: Ajouter plus d'endpoints, validation, etc.
4. **Ajouter des tests**: Jest, React Testing Library, etc.
5. **Déployer**: Vercel (frontend), Render/Railway (backend)

## Notes

- Les fichiers `.env` sont inclus dans le repo (idéal pour le développement)
- En production, mettre à jour `.gitignore` pour exclure `.env`
- Le proxy API ne fonctionne que en développement (Vite)
- En production, les requêtes API doivent utiliser l'URL complète du backend
