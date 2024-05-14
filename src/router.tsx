import { RouteObject } from "react-router-dom";

import ErrorPage from "./error-page";
import Home from "./home";

export default [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: []
  }
] as RouteObject[];
