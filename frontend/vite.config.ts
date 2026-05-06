import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Semua request /api/* diteruskan ke backend Express
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // Teruskan cookie (HttpOnly) antara frontend dev-server dan backend
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            // Pastikan cookie ikut diteruskan
            if (req.headers.cookie) {
              proxyReq.setHeader('cookie', req.headers.cookie);
            }
          });
        },
      },
    },
  },
})
