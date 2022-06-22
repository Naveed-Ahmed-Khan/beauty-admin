import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import curve2 from "../assets/images/curve2.png";
import flower from "../assets/images/flower.png";
import { Outlet } from "react-router-dom";
import Chat from "../components/chat/Chat";

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

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

      <Sidebar />
      <div className="ml-40 relative flex h-screen overflow-auto">
        <Outlet />
        <div className="group absolute right-10 bottom-10">
          {/* <div
            className={`scale-100 translate-x-0 translate-y-0 transition-all duration-500 ${
              isChatOpen && "scale-100 translate-x-0 translate-y-0"
            }`}
          >
            <Chat setIsChatOpen={setIsChatOpen} />
          </div> */}
          {isChatOpen ? (
            <Chat setIsChatOpen={setIsChatOpen} />
          ) : (
            <div
              onClick={() => {
                setIsChatOpen(true);
              }}
              className="flex bg-opacity-90 hover:bg-opacity-100 items-center justify-center border-2 border-white hover:border-2 hover:border-primary bg-dark h-20 w-20 rounded-full hover:scale-110 hover:shadow-md hover:drop-shadow-lg hover:shadow-gray-600 transition-all duration-300 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-primary-dark group-hover:text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
