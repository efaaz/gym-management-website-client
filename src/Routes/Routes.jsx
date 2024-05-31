import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home/Home";
import Layout from "../Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
