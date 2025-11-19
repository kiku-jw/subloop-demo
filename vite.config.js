import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// For Vercel: base: '/', outDir: 'dist'
// For GitHub Pages: base: '/subloop-demo/', outDir: 'docs'
const isVercel = process.env.VERCEL === '1' || process.env.VITE_VERCEL === 'true'

export default defineConfig({
  plugins: [vue()],
  base: isVercel ? '/' : '/subloop-demo/',
  build: {
    outDir: isVercel ? 'dist' : 'docs',
    assetsDir: 'assets',
  },
})
