import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

console.log(fileURLToPath(new URL('./src', import.meta.url)));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Aquí organizamos los assets según su tipo
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name ?? '')) {
            return 'assets/images/[name][extname]';
          }
          if (/\.css$/.test(assetInfo.name ?? '')) {
            return 'assets/styles/[name][extname]';
          }
          // Otros tipos de assets pueden manejarse aquí
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
