import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home/Home";
import Layout from "../Layout/Layout";
import Error from "../ErrorPage/Error";
import Login from "../Components/Common/Login/Login";
import Register from "../Components/Common/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllTrainers from "../Components/Dashboard/Admin/AllTrainers/AllTrainers";
import AppliedTrainers from "../Components/Dashboard/Admin/AppliedTrainers/AppliedTrainers";
import AddNewsClasses from "../Components/Dashboard/Admin/AddNewClasses/AddNewsClasses";
import Blance from "../Components/Dashboard/Admin/Balance/Blance";
import Subscribers from "../Components/Dashboard/Admin/NewsLetterSubscribers/Subscribers";
import AdminHome from "../Components/Dashboard/Admin/Home/AdminHome";
import AddNewSlots from "../Components/Dashboard/Trainer/AddNewSlots/AddNewSlots";
import ActivityLog from "../Components/Dashboard/Member/ActivityLog/ActivityLog";
import BookedTrainer from "../Components/Dashboard/Member/BookedTrainer/BookedTrainer";
import Profile from "../Components/Dashboard/Member/Profile/Profile";
import AllTrainer from "../Components/OtherRoutes/AllTrainer/AllTrainer";
import TrainerDetails from "../Components/OtherRoutes/TrainerDetails/TrainerDetails";
import BecomeATrainer from "../Components/OtherRoutes/BecomeATrainer/BecomeATrainer";
import Community from "../Components/OtherRoutes/Community/Community";
import TrainerBooked from "../Components/OtherRoutes/TrainerBooked/TrainerBooked";
import PaymentPage from "../Components/OtherRoutes/PaymentPage/PaymentPage";
import AllClasses from "../Components/OtherRoutes/AllClasses/AllClasses";
import AdminTrainerDetails from "../Components/Dashboard/Admin/AminTrainerDetails/AdminTrainerDetails";
import SearchByPhoto from "../Components/OtherRoutes/SearchByPhoto/SearchByPhoto";
import AddNewForumAdmin from "../Components/Dashboard/Admin/AddNewForumAdmin/AddNewForumAdmin";
import AddNewForumTrainer from "../Components/Dashboard/Trainer/AddNewForumTrainer/AddNewForumTrainer";
import ManageSlots from "../Components/Dashboard/Trainer/ManageSlots/ManageSlots";

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
      {
        path: "/all-trainer",
        element: <AllTrainer />,
      },
      {
        path: "/all-classes",
        element: <AllClasses />,
      },
      {
        path: "/trainers/:name",
        element: <TrainerDetails />,
      },
      {
        path: "/serch-by-photo/:photo",
        element: <SearchByPhoto />,
      },
      {
        path: "/BecomeATrainer",
        element: (
          <PrivateRoute>
            <BecomeATrainer />
          </PrivateRoute>
        ),
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/book/:trainer/:slot",
        element: (
          <PrivateRoute>
            <TrainerBooked />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:trainer/:slot/:packageName",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
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
        path: "/dashboard/trainer-details/:id",
        element: <AdminTrainerDetails />,
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
        path: "/dashboard/add-new-form",
        element: <AddNewForumAdmin></AddNewForumAdmin>,
      },
      {
        path: "/dashboard/balance",
        element: <Blance></Blance>,
      },

      // Trainer Routes
      {
        path: "/dashboard/add-new-slot",
        element: <AddNewSlots></AddNewSlots>,
      },
      {
        path: "/dashboard/manage-slots",
        element: <ManageSlots></ManageSlots>,
      },
      {
        path: "/dashboard/add-new-form-trainer",
        element: <AddNewForumTrainer></AddNewForumTrainer>,
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
