import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
// import nightwatchPlugin from 'vite-plugin-nightwatch'
// import vueDevTools from 'vite-plugin-vue-devtools'
import injectPlugin from '@rollup/plugin-inject';
import UnoCSS from 'unocss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueJsx(),
    // nightwatchPlugin(),
    // vueDevTools(),
    injectPlugin({
      $fetch: [fileURLToPath(new URL('./src/utils/axios-fetch.ts', import.meta.url)), 'default'],
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
    }
  }
})
