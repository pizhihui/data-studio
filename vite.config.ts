import { defineConfig } from 'vite'
import type { Plugin } from "vite";
import react from '@vitejs/plugin-react'

import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import { createRequire } from 'node:module'

// pnpm install @types/node -D
import { fileURLToPath, URL } from 'node:url'

import { patchCssModules } from 'vite-css-modules'


const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;
export function reactVirtualized(): Plugin {
  return {
    name: "flat:react-virtualized",
    // Note: we cannot use the `transform` hook here
    //       because libraries are pre-bundled in vite directly,
    //       plugins aren't able to hack that step currently.
    //       so instead we manually edit the file in node_modules.
    //       all we need is to find the timing before pre-bundling.
    configResolved: async () => {
      const require = createRequire(import.meta.url)
      const reactVirtualizedPath = require.resolve('react-virtualized')
      const { pathname: reactVirtualizedFilePath } = new url.URL(reactVirtualizedPath, import.meta.url)
      const file = reactVirtualizedFilePath
        .replace(
          path.join('dist', 'commonjs', 'index.js'),
          path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js'),
        )
      const code = await fs.readFile(file, 'utf-8')
      const modified = code.replace(WRONG_CODE, '')
      await fs.writeFile(file, modified)
    },
  };
}


// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true,
    // 'postcss' | 'lightningcss';
    // transformer: 'postcss',
    // 对css的行为进行配置
    // modules配置最终会丢给postcss modules
    modules: {
      //scopeBehaviour: 'local'
      // generateScopedName: '[name]_[local]_[hash:base64:5]'
      generateScopedName: '[name]__[local]--[hash:5]'
      // generateScopedName: (className, filePath, css) => {
      //   const classNameIndex = css.indexOf(`.${className}`);
      //   const lineNumber = css.substr(0, classNameIndex).split(/\r?\n/).length;
      //   const fileName = path.basename(filePath, '.module.css');
      //   const prefix = 'm_';
      //
      //   return `${prefix}${fileName}_${className}_${lineNumber}`;
      // },
    }
  },
  server: {
    host: '127.0.0.1',
    port: 8067,
    proxy: {
      '/api': {
        target: 'https://hl-data-studio.juziboss.com',
        changeOrigin: true,
        secure: false,
        headers: {
          'Cookie': 'linkis_user_session_ticket_id_v1=YvF7lwB5IXyNnnxRs22LgPSqUTaT41ZetJM7NqUD+BM='
        }
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  plugins: [
    react(),
    reactVirtualized()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext'
  }
})
