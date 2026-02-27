import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import ErrorPage from "./error-page";
import Login from "./pages/login";
import Home from "./home";
import Image from "./pages/images";
import User from "./pages/user/list";
import Wedding from "./pages/wedding";
import Test from "./pages/test";
import ChuanDai from "./pages/chuan-dai";

export default [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "user",
        element: <User />
      },
      {
        path: "image",
        element: <Image />
      },
      {
        path: "wedding",
        element: <Wedding />
      },
      {
        path: "test",
        element: <Test />
      },
      {
        path: "chuan-dai",
        element: <Navigate to="/chuan-dai/menu" replace />
      },
      {
        path: "chuan-dai/:tab",
        element: <ChuanDai />
      }
    ]
  }
] as RouteObject[];
