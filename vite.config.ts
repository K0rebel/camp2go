import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'models/*.glb'],
      manifest: {
        name: 'Camp2Go - Asystent Przyczepy 3D',
        short_name: 'Camp2Go',
        description: 'Interaktywna lista kontrolna 3D do sprawdzania przyczepy kempingowej przed wyjazdem',
        theme_color: '#030b17',
        background_color: '#030b17',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,glb,gltf,bin,json}'],
        maximumFileSizeToCacheInBytes: 60 * 1024 * 1024
      }
    })
  ],
  server: {
    port: 5173,
    host: true
  }
})
