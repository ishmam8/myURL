import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: "/myURL/",
  build: {
    chunkSizeWarningLimit: 1000,
  },
  plugins: [vue()]
});