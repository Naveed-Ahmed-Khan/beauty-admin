import React from "react";
import Chat from "./chat/Chat";
import logo from "../assets/images/logo.png";

const Navbar = (props) => {
  return (
    <div className="z-30 md:hidden fixed w-full flex items-center justify-between px-6 h-16 bg-light">
      <button
        onClick={() => {
          props.setOpen(!props.open);
          props.setShowBackdrop(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <img
        src={logo}
        alt="menu"
        className="object-contain h-20 -mr-6 cursor-pointer text-white"
      />
    </div>
  );
};

export default Navbar;
