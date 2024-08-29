import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// pnpm install @types/node -D
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   devSourcemap: true,
  //   transformer: 'lightningcss',
  //   // 对css的行为进行配置
  //   // modules配置最终会丢给postcss modules
  //   modules: {
  //
  //   }
  // },
  server: {
    host: '127.0.0.1',
    port: 8067,
    proxy: {
      '/api': {
        target: 'https://hl-data-studio.juziboss.com',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
