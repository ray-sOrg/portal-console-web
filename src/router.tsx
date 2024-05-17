import { RouteObject } from "react-router-dom";

import ErrorPage from "./error-page";
import Login from "./pages/login";
import Home from "./home";
import Upload from "./pages/upload";
import User from "./pages/user/list";

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
        path: "upload",
        element: <Upload />
      }
    ]
  }
] as RouteObject[];
