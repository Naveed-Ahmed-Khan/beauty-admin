import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import curve2 from "../assets/images/curve2.png";
import flower from "../assets/images/flower.png";
import { Outlet } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useStateContext } from "../contexts/ContextProvider";

const Dashboard = () => {
  return (
    <div>
      <div className="-z-40 bg-black relative">
        <img
          src={flower}
          className="-z-20 bg-black absolute right-0 w-[20%] md:w-[25%] xl:w-[30%]"
          alt=""
        />
        <img
          src={curve2}
          className="-z-30 bg-black absolute right-0 w-[60%] bottom-[calc(100%-100vh)]"
          alt=""
        />
      </div>
      <div className="-z-50 absolute bg-black h-screen w-screen" />

      <div className="flex ">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
