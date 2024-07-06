import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'

// Loading environment variables from .env
const env = loadEnv('all', process.cwd());

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue(),
    vueJsx(),
    // vueDevTools(),
  ],
  server: {
    port: env.VITE_PORT,
    host: env.VITE_HOST
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
