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
        target: "http://localhost:3000", // 你要代理到的目标地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "") // 可选的重写路径
      }
    }
  }
});
