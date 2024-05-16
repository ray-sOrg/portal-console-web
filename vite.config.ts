import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: "lightningcss"
  },
  build: {
    cssMinify: "lightningcss"
  },
  resolve: {
    alias: {
      "@": "/src/",
      component: "/src/component/",
      assets: "/src/assets/"
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000", // 你要代理到的目标地址
        changeOrigin: true
      }
    }
  }
});
