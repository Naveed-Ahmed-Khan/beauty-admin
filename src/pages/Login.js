import React from "react";
import curve from "../assets/images/curve.png";
import brush from "../assets/images/brush.png";
import logo from "../assets/images/logo.png";
import lock from "../assets/icons/lock.svg";
import eye from "../assets/icons/eye.svg";
import user from "../assets/icons/user.svg";
import text from "../assets/images//text.png";
import Button from "../components/UI/Button";

const Login = () => {
  return (
    <div className="">
      <div className="-z-40 bg-dark relative">
        <img
          src={curve}
          className="bg-dark absolute left-0 w-[80%] md:w-[85%] xl:w-[90%]"
          alt=""
        />
        <img
          src={brush}
          className="bg-dark absolute right-0 w-[45%] bottom-[calc(100%-100vh)]"
          alt=""
        />
      </div>
      <div className="-z-50 absolute bg-dark h-screen w-screen" />

      <div className="max-w-sm lg:max-w-[440px] mx-auto">
        <div className="pt-[3vh] grid place-content-center place-items-center">
          <img className="object-contain" src={logo} alt="" />
          <img className="object-contain" src={text} alt="" />
        </div>

        <div className="mt-15 space-y-7 lg:mt-20 lg:space-y-10 ">
          <div className="relative flex flex-col gap-1 items">
            <img
              className="absolute top-6 left-5 object-contain w-5"
              src={user}
              alt=""
            />
            <input
              className={`text-white bg-dark border-2 border-tertitary rounded outline-none ring-0 placeholder-white placeholder:font-medium placeholder:text-lg
                            focus:border-2 focus:border-primary-dark caret-white
                             md:py-5 md:px-14 transition-all duration-200`}
              placeholder="Username"
            />
          </div>
          <div className="relative flex flex-col gap-1 items">
            <img
              className="absolute top-6 left-5 object-contain w-4"
              src={lock}
              alt=""
            />
            <img
              className="absolute top-7 right-5 object-contain w-6"
              src={eye}
              alt=""
            />
            <input
              className={`text-white border-2 border-primary-dark bg-dark rounded outline-none ring-0 placeholder-primary-dark placeholder:font-medium placeholder:text-lg
                        focus:border-2 focus:border-primary-dark focus:placeholder-primary-dark caret-white
                         md:py-5 md:px-14 transition-all duration-200`}
              placeholder="Password"
            />
          </div>

          <Button fullWidth type={"button"}>
            <p className="text-black text-lg font-semibold">Login</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
