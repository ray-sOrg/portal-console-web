import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import router from "./router";
import theme from "./theme";
import "./assets/css/main.css";

dayjs.extend(utc);

const queryClient = new QueryClient();

const browserRouter = createBrowserRouter(router);

// 版本信息
console.log("%c🚀 portal-console-web v0.1.0", "color: #4CAF50; font-weight: bold; font-size: 14px;");
console.log("%c   构建时间: " + new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }), "color: #888;");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={browserRouter} />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);
