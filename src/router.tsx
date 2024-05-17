import { RouteObject } from "react-router-dom";

import ErrorPage from "./error-page";
import Login from "./pages/login";
import Home from "./home";
import Upload from "./pages/upload";

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
        path: "upload",
        element: <Upload />
      }
    ]
  }
] as RouteObject[];
