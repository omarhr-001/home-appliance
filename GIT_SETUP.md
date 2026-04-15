# Configuration Git et Commits

## Première Utilisation

### 1. Vérifier le status du repo
```bash
git status
```

### 2. Ajouter tous les fichiers (première fois)
```bash
git add .
```

### 3. Commit initial
```bash
git commit -m "chore: simplify project structure - new frontend/backend setup"
```

### 4. Push vers main
```bash
git push origin main
```

## Commits Recommandés

Pour une meilleure organisation, voici les commits suggérés:

### Commit 1: Structure de base
```bash
git add frontend/ backend/ package.json pnpm-workspace.yaml
git commit -m "feat: create simplified frontend/backend structure"
```

### Commit 2: Documentation
```bash
git add README_NEW.md PROJECT_STRUCTURE.md MIGRATION_SUMMARY.md QUICK_START.txt
git commit -m "docs: add comprehensive documentation"
```

### Commit 3: Configuration
```bash
git add .gitignore start-dev.sh GIT_SETUP.md
git commit -m "build: add development setup and configuration"
```

## Conventions de Commit

Utilisez les préfixes standard:

- **feat**: Nouvelle fonctionnalité
- **fix**: Correction de bug
- **docs**: Documentation
- **style**: Formatage du code
- **refactor**: Refactorisation
- **test**: Tests
- **chore**: Maintenance, dépendances
- **build**: Build, configuration

## Branches Recommandées

```
main (ou master)
├── develop
│   ├── feature/authentication
│   ├── feature/database
│   ├── feature/payments
│   └── bugfix/api-error
```

## Workflow de Développement

### Créer une feature
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Après développement
```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

### Créer une Pull Request
- Accédez au repo sur GitHub
- Cliquez sur "Compare & pull request"
- Décrivez vos changements
- Demandez une review
- Merge une fois approuvé

## Ignorer les Fichiers Sensibles

Les fichiers sensibles sont déjà ignorés (.env, node_modules, dist):

```
.env                    # Variables d'environnement
.env.local             # Configuration locale
node_modules           # Dépendances installées
dist                   # Build produits
.cache/                # Cache développement
.vscode/               # Settings VSCode personnels
```

## Commandes Utiles

### Voir l'historique
```bash
git log --oneline
git log --graph --oneline --all
```

### Annuler des changements
```bash
git restore <file>           # Annuler changements non staged
git restore --staged <file>  # Unstage
git revert HEAD              # Annuler dernier commit
```

### Stash (mettre de côté)
```bash
git stash                   # Mettre de côté les changements
git stash pop              # Récupérer les changements
git stash list             # Voir les stashes
```

### Merge branches
```bash
git checkout main
git merge feature/your-feature
```

## Protection de main

Recommandé sur GitHub:
1. Allez à Settings > Branches
2. Ajouter une rule pour `main`
3. Cocher "Require pull request reviews"
4. Cocher "Require status checks"

## Collaboration

### Pull latest changes
```bash
git fetch origin
git pull origin main
```

### Résoudre un conflit
```bash
git status  # Voir les fichiers en conflit
# Éditer manuellement les fichiers
git add .
git commit -m "fix: resolve merge conflicts"
```

## CI/CD avec GitHub Actions

Exemple basique:

```yaml
name: Build and Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm typecheck
```

## Déploiement Automatique

### Frontend (Vercel)
1. Connectez votre repo Vercel
2. Sélectionnez `frontend` comme root directory
3. Build command: `pnpm build`
4. Output directory: `dist`

### Backend (Render/Railway)
1. Connectez votre repo
2. Build command: `cd backend && pnpm build`
3. Start command: `cd backend && pnpm start`

## Bonnes Pratiques

✅ **À FAIRE:**
- Committer régulièrement (petit commits)
- Décrire clairement les commits
- Créer des branches pour chaque feature
- Faire des PRs avant merge sur main
- Mettre à jour la documentation

❌ **À NE PAS FAIRE:**
- Committer les fichiers .env
- Gros commits avec beaucoup de changements
- Forcer push sur main (`git push --force`)
- Committer du code commented
- Ignorer les conflits de merge

## Aide

Pour plus d'informations:
- https://git-scm.com/doc
- https://github.com/git-tips/tips
- https://www.atlassian.com/git/tutorials
