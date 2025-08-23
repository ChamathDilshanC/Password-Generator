# Files NOT to Push to GitHub 🚫

This document lists all files and directories that should NOT be committed to the repository.

## 🔒 Sensitive Configuration Files

### Environment Variables:
- `.env` - Contains API keys and secrets
- `.env.local` - Local development environment variables
- `.env.development.local` - Development-specific secrets
- `.env.test.local` - Test environment secrets
- `.env.production.local` - Production secrets

**Demo File:** `.env.example` ✅ (safe to commit)

### Firebase Configuration:
- `serviceAccountKey.json` - Firebase admin SDK private key
- `*-key.json` - Any JSON files containing keys
- `*-secret.json` - Any secret configuration files

**Demo File:** `serviceAccountKey.example.json` ✅ (safe to commit)

### Local Configuration:
- `config.local.js` - Local development settings
- `config.local.json` - Local configuration overrides
- `*.local.*` - Any local configuration files

**Demo File:** `config.example.js` ✅ (safe to commit)

## 📦 Build Outputs & Dependencies

### Build Directories:
- `frontend/dist/` - Vite build output (auto-generated)
- `frontend/build/` - Alternative build output
- `out/` - Next.js build output
- `.cache/` - Build cache files

### Dependencies:
- `frontend/node_modules/` - NPM dependencies (large, auto-installable)
- `node_modules/` - Root dependencies
- `jspm_packages/` - JSPM dependencies

### Cache Files:
- `.firebase/` - Firebase CLI cache
- `.rpt2_cache*/` - Rollup TypeScript cache
- `.rts2_cache*/` - Rollup cache variants
- `.nyc_output` - Test coverage cache

## 🛠️ Development Files

### IDE/Editor Files:
- `.vscode/` - VS Code workspace settings
- `.idea/` - IntelliJ IDEA settings
- `*.swp`, `*.swo` - Vim swap files

### OS Generated Files:
- `.DS_Store` - macOS folder metadata
- `Thumbs.db` - Windows thumbnail cache
- `ehthumbs.db` - Windows image cache

## 📝 Log Files

### Application Logs:
- `*.log` - All log files
- `logs/` - Log directory
- `npm-debug.log*` - NPM debug logs
- `yarn-debug.log*` - Yarn debug logs
- `firebase-debug.log*` - Firebase debug logs

## 🔧 Temporary Files

### Development Temporaries:
- `*.tmp` - Temporary files
- `*.temp` - Temporary files
- `*.pid` - Process ID files
- `*.seed` - Random seed files

### TypeScript Cache:
- `*.tsbuildinfo` - TypeScript build cache
- `typings/` - Legacy TypeScript definitions

## ✅ What TO Commit

### Configuration Templates:
- `.env.example` - Environment variables template
- `serviceAccountKey.example.json` - Firebase config template
- `config.example.js` - Local config template

### Documentation:
- `README.md` - Project documentation
- `DEVELOPMENT.md` - Development setup guide
- `LICENSE` - Project license
- `NOTICE` - Legal notices

### Source Code:
- `frontend/src/` - React application source
- `frontend/public/` - Static assets
- `firebase.json` - Firebase hosting config
- `.firebaserc` - Firebase project config

### Package Configuration:
- `frontend/package.json` - NPM dependencies
- `frontend/package-lock.json` - Dependency lock file
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite bundler config

## 🎯 Quick Check

Before committing, verify:
```bash
# Check what's staged
git status

# Check what's ignored
git status --ignored

# Check for sensitive patterns
git diff --staged | grep -i "api_key\|secret\|password"
```

## 📧 Questions?

For security concerns or questions about what to commit:
**Email:** chamamcolonne@gmail.com

---
**Remember:** When in doubt, don't commit sensitive files! 🔐
