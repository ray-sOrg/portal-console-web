import { RouteObject } from "react-router-dom";

import ErrorPage from "./error-page";
import Home from "./home";
import Upload from "./pages/upload";

export default [
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
