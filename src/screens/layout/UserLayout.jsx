import React from "react";
import { Outlet } from "react-router-dom";
import HeaderNavbar from "../NavBars/HeaderNavbar";

const UserLayout = () => {
  return (
    <>
      <HeaderNavbar />
      <Outlet />
    </>
  );
};

export default UserLayout;