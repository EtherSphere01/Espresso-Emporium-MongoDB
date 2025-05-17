import React from "react";
import { Outlet } from "react-router";
import Header from "../component/Header";
import Footer from "../component/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Header></Header>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
