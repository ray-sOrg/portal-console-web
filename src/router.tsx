import { RouteObject } from "react-router-dom";

import ErrorPage from "./error-page";
import Login from "./pages/login";
import Home from "./home";
import Image from "./pages/images";
import User from "./pages/user/list";
import Test from "./pages/test";

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
        path: "test",
        element: <Test />
      }
    ]
  }
] as RouteObject[];
