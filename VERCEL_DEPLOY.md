# Vercel Deployment Guide

## Deployment Settings

When deploying to Vercel, use the following settings:

### Build & Development Settings

- **Framework Preset**: `Vite`
- **Build Command**: `VERCEL=1 npm run build` (or use `vercel.json` which sets this automatically)
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev` (optional)

### Environment Variables

No environment variables required. The `VERCEL=1` is set automatically in `vercel.json`.

## Automatic Detection

Vercel should automatically detect:
- Framework: Vite
- Build Command: `VERCEL=1 npm run build` (from `vercel.json`)
- Output Directory: `dist` (from `vercel.json`)

## Manual Configuration

If you need to configure manually:

1. Go to Project Settings → General
2. Set Framework Preset to `Vite`
3. Override build command: `VERCEL=1 npm run build`
4. Override output directory: `dist`

**Note:** The `VERCEL=1` environment variable ensures the correct base path (`/`) and output directory (`dist`) are used instead of GitHub Pages settings.

## Deployment

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Via GitHub Integration

1. Connect your GitHub repository
2. Vercel will automatically deploy on push to `main`
3. Settings are configured via `vercel.json`

## Notes

- The project is configured to use `/` as base path for Vercel (vs `/subloop-demo/` for GitHub Pages)
- Build output goes to `dist` for Vercel (vs `docs` for GitHub Pages)
- This is handled automatically via `process.env.VERCEL` check in `vite.config.js`

