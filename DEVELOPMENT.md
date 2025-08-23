# Development Setup Guide 🛠️

This guide explains how to set up sensitive configuration files for development.

## 📁 Configuration Files

### Required Setup Files (Copy from examples):

1. **Environment Variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your actual values.

2. **Firebase Service Account** (if using backend features)

   ```bash
   cp serviceAccountKey.example.json serviceAccountKey.json
   ```

   Replace with your actual Firebase service account key.

3. **Local Configuration** (optional)
   ```bash
   cp config.example.js config.local.js
   ```
   Customize development settings.

## 🚫 Files NOT to Commit

These files are automatically ignored by Git:

### Sensitive Files:

- `.env`, `.env.local`, `.env.*.local`
- `serviceAccountKey.json`
- `*-key.json`, `*-secret.json`
- `config.local.*`

### Build Outputs:

- `dist/`, `build/`, `out/`
- `node_modules/`
- `.cache/`

### IDE/OS Files:

- `.vscode/`, `.idea/`
- `.DS_Store`, `Thumbs.db`
- `*.swp`, `*.swo`

### Temporary Files:

- `*.log`, `*.tmp`
- `.firebase/`
- `.rpt2_cache*/`

## ⚡ Quick Start

1. Clone the repository
2. Copy example files:
   ```bash
   cp .env.example .env.local
   cp serviceAccountKey.example.json serviceAccountKey.json
   ```
3. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Start development:
   ```bash
   npm run dev
   ```

## 🔒 Security Notes

- Never commit actual API keys or service account files
- Use example files as templates
- Keep sensitive data in `.local` files (automatically ignored)
- Review .gitignore before pushing changes

## 📧 Support

For setup issues, contact: chamamcolonne@gmail.com
