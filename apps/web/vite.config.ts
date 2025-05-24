import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue(),svgLoader(/* opções se quiser */)],
  resolve: {
    alias: {
      // Faz `@/components/...` apontar para `apps/web/src/components/...`
      '@': path.resolve(__dirname, 'src')
    }
  }
})
