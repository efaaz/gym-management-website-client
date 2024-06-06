import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home/Home";
import Layout from "../Layout/Layout";
import Error from "../ErrorPage/Error";
import Login from "../Components/Common/Login/Login";
import Register from "../Components/Common/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";

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
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Register />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      

      // admin routes
      // {
      //   path: 'users',
      //   element: <AllUsers></AllUsers>
      // }

    ]
  }
]);
