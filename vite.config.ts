import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    transformer: "lightningcss"
  },
  build: {
    cssMinify: "lightningcss"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      // 开发环境代理：所有 /api 请求代理到本地后端
      "/api": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      }
    }
  }
});
