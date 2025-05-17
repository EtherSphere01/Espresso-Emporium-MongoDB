import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "../component/Header";
import Footer from "../component/Footer";
import LoadingScreen from "../component/LoadingScreen";

const MainLayout = () => {
  return (
    <div className="">
      <Header></Header>
      <Suspense fallback={<LoadingScreen></LoadingScreen>}>
        <Outlet />
      </Suspense>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
