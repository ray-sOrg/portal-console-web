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
      "/api": {
        target: "http://127.0.0.1:5000", // 你要代理到的目标地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "/") // 将 /api 重写为 /
      }
      // "/api": {
      //   target: "https://console.ray321.cn",
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/api/, "/api")
      // }
    }
  }
});
