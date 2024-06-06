import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home/Home";
import Layout from "../Layout/Layout";
import Error from "../ErrorPage/Error";
import Login from "../Components/Common/Login/Login";
import Register from "../Components/Common/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import ManageSlots from "../Components/Dashboard/Admin/ManageSlots/ManageSlots";
import AllTrainers from "../Components/Dashboard/Admin/AllTrainers/AllTrainers";
import AppliedTrainers from "../Components/Dashboard/Admin/AppliedTrainers/AppliedTrainers";
import NewsLetter from "../Components/Home/NewsLetter/NewsLetter";
import AddNewsClasses from "../Components/Dashboard/Admin/AddNewClasses/AddNewsClasses";
import Blance from "../Components/Dashboard/Admin/Balance/Blance";
import Subscribers from "../Components/Dashboard/Admin/NewsLetterSubscribers/Subscribers";
import AdminHome from "../Components/Dashboard/Admin/Home/AdminHome";
import AddNewSlots from "../Components/Dashboard/Trainer/AddNewSlots/AddNewSlots";
import AddNewForum from "../Components/Dashboard/Trainer/AddNewForum/AddNewForum";
import ActivityLog from "../Components/Dashboard/Member/ActivityLog/ActivityLog";
import BookedTrainer from "../Components/Dashboard/Member/BookedTrainer/BookedTrainer";
import Profile from "../Components/Dashboard/Member/Profile/Profile";

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
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // Admin Routes
      {
        path: "/dashboard/adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "/dashboard/manage-slots",
        element: <ManageSlots></ManageSlots>,
      },
      {
        path: "/dashboard/all-trainers",
        element: <AllTrainers></AllTrainers>,
      },
      {
        path: "/dashboard/applied-trainers",
        element: <AppliedTrainers></AppliedTrainers>,
      },
      {
        path: "/dashboard/newsletter-subscribers",
        element: <Subscribers> </Subscribers>,
      },
      {
        path: "/dashboard/add-new-classes",
        element: <AddNewsClasses></AddNewsClasses>,
      },
      {
        path: "/dashboard/balance",
        element: <Blance></Blance>,
      },

      // Trainer Routes
      {
        path: "/dashboard/add-new-forum",
        element: <AddNewForum></AddNewForum>,
      },
      {
        path: "/dashboard/add-new-slot",
        element: <AddNewSlots></AddNewSlots>,
      },
      {
        path: "/dashboard/manage-slots",
        element: <ManageSlots></ManageSlots>,
      },

      // Member Routes
      {
        path: "/dashboard/activity-log",
        element: <ActivityLog></ActivityLog>,
      },
      {
        path: "/dashboard/booked-trainer",
        element: <BookedTrainer></BookedTrainer>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
