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
      // 开发环境代理 API 请求到本地后端
      // 所有以 / 开头的非静态文件请求都代理
      // 运行: yarn dev (本地后端 http://127.0.0.1:5001)
      "/login": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      },
      "/logout": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      },
      "/user": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      },
      "/oss": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      },
      "/image": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      },
      "/wedding": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      },
      "/chuan-dai": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      },
      "/test": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      },
      "/health": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true
      }
    }
  }
});
