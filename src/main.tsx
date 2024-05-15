import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import router from "./router";
import theme from "./theme";
import "./assets/css/main.css";

const browserRouter = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <RouterProvider router={browserRouter} />
    </ConfigProvider>
  </React.StrictMode>
);
