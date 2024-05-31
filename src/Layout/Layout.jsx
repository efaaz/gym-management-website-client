import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar/Navbar";

function Layout() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
