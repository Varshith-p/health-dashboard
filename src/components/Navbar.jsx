/* eslint-disable react/prop-types */
import { useState } from "react";
import logo from "../assets/logo.png";
import { GoHome } from "react-icons/go";
import { BsPassport } from "react-icons/bs";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

const Navbar = ({ loading, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "home", icon: <GoHome size={20} /> },
    { name: "passport", icon: <BsPassport size={20} /> },
    { name: "settings", icon: <IoSettingsOutline size={20} /> },
    { name: "logout", icon: <IoLogOutOutline size={20} /> },
  ];

  return (
    <header className="lg:hidden px-6 bg-[#ebf5fe]">
      <div className="flex justify-between items-center h-16">
        <div>
          <img src={logo} alt="curonostics-logo" width={240} />
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
          className="w-nav-button pb-1.5 relative float-right text-lg lg:hidden cursor-pointer focus:outline-none"
        >
          <div
            className={`${
              isOpen ? "gap-0" : "gap-[6px]"
            } w-12 h-12 flex flex-col  justify-center items-center mr-[-0.5rem] pb-0 pr-0 transition-all duration-500`}
          >
            <div
              className={`${
                isOpen ? "-rotate-45 translate-y-0.5" : ""
              } w-6 h-0.5 bg-black transition-all duration-500`}
            ></div>
            <div
              className={`${
                isOpen ? "w-0 h-0" : "w-6 h-0.5"
              } bg-black transition-all duration-500`}
            ></div>
            <div
              className={`${
                isOpen ? "rotate-45" : ""
              } w-6 h-0.5 bg-black transition-all duration-500`}
            ></div>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen && "h-[calc(100vh-64px)] pt-4"
        } absolute overflow-hidden lg:hidden bg-[#ebf5fe] z-[1000] flex flex-col top-16 bottom-16 h-0 w-screen left-0 px-6 transition-all duration-500`}
      >
        <div className="flex flex-col gap-2">
          {links.map((link, index) => (
            <p
              key={index}
              className="capitalize flex gap-2 items-center cursor-pointer w-full transition-colors duration-200 ease-in-out hover:bg-[#ebf5fe] rounded-md p-2"
            >
              <span>{link.icon}</span>
              <span className="xl:pt-0.5">{link.name}</span>
            </p>
          ))}
        </div>
        {loading ? (
          <div className="flex items-center gap-2">
            <p className="w-8 h-8 xxl:w-10 xxl:h-10 rounded-full bg-slate-200 animate-pulse flex items-center justify-center"></p>
            <p className="bg-slate-200 h-4 animate-pulse rounded-md"></p>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2 mt-6 pb-6">
            <img
              className="w-8 h-8 xxl:w-12 xxl:h-12 rounded-full bg-red-600 flex items-center justify-center"
              src={user?.picture?.medium}
            />
            <p className="text-sm xxl:text-lg">{`${user?.name?.first} ${user?.name?.last}`}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
