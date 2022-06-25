import React from "react";
import Chat from "./chat/Chat";
import logo from "../assets/images/logo.png";

const Navbar = (props) => {
  return (
    <div className="z-30 md:hidden fixed w-full flex items-center justify-between px-6 h-16 bg-light">
      <img
        onClick={() => {
          props.setOpen(!props.open);
          props.setShowBackdrop(true);
        }}
        src={"https://img.icons8.com/ios/50/000000/menu.png"}
        alt="menu"
        className="object-contain h-8 cursor-pointer text-white"
      />
      <img
        src={logo}
        alt="menu"
        className="object-contain h-20 -mr-6 cursor-pointer text-white"
      />
    </div>
  );
};

export default Navbar;
