import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://api.yaytopup.my.id',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

