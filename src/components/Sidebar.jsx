/* eslint-disable react/prop-types */
import logo from "../assets/logo.png";
import { GoHome } from "react-icons/go";
import { BsPassport } from "react-icons/bs";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

const Sidebar = ({ loading, user }) => {
  const links = [
    { name: "home", icon: <GoHome size={20} /> },
    { name: "passport", icon: <BsPassport size={20} /> },
    { name: "settings", icon: <IoSettingsOutline size={20} /> },
    { name: "logout", icon: <IoLogOutOutline size={20} /> },
  ];
  return (
    <aside className="hidden bg-[#ebf5fe]/40 h-screen p-4 xxl:p-8 lg:flex flex-col gap-6 xxl:gap-8 border-r border-gray-200">
      <img src={logo} alt="curonostics-logo" width={240} />
      <div className="flex-1 flex flex-col gap-2 text-sm xxl:text-lg">
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
        <div className="flex items-center gap-2 px-2">
          <img
            className="w-8 h-8 xxl:w-12 xxl:h-12 rounded-full bg-red-600 flex items-center justify-center"
            src={user?.picture?.medium}
          />
          <p className="text-sm xxl:text-lg">{`${user?.name?.first} ${user?.name?.last}`}</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
