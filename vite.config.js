import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('three-stdlib') || id.includes('troika') || id.includes('@react-three')) {
            return 'r3f-vendor'
          }
          if (id.includes('node_modules/three')) {
            return 'three-core'
          }
          if (id.includes('postprocessing')) {
            return 'postfx-vendor'
          }
          if (id.includes('firebase')) {
            return 'firebase-vendor'
          }
          if (id.includes('xlsx') || id.includes('papaparse')) {
            return 'data-vendor'
          }
          if (id.includes('react-icons')) {
            return 'icons-vendor'
          }
        },
      },
    },
  },
})
