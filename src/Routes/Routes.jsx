import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home/Home";
import Layout from "../Layout/Layout";
import Error from "../ErrorPage/Error";

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
