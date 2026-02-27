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
      // 开发环境使用本地后端，生产环境使用远程
      // 开发时运行: API_URL=http://127.0.0.1:5001 npm run dev
      "/api": {
        target: process.env.API_URL || "https://console.ray321.cn",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
});
