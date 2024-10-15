import { Link, useLocation } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";

const listNav = [
  {
    icon: "home",
    name: "Inicio",
    url: "/",
  },
  {
    icon: "explore",
    name: "Explorar",
    url: "/explore",
  },
  {
    icon: "notification",
    name: "Notificaciones",
    url: "/notifications",
  },
  {
    icon: "message",
    name: "Mensajes",
    url: "/messages",
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [isIndex, setIsIndex] = useState(0);
  return (
    <header className="w-full h-[90px] bg-secondBlack-700 text-white">
      <nav className="max-w-[1210px] w-full h-full mx-auto flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-widest">
          <span className="text-primaryGreen-400">Tech</span>Social
        </h2>
        <div className=" flex items-center h-full ">
          <ul className={`flex items-center gap-x-8 relative h-full`}>
            {listNav.map((item, index) => (
              <Link
                to={item.url}
                className={`flex items-center gap-x-1 z-10 transition-all duration-100 ${
                  isIndex === index ? "text-primaryGreen-400" : ""
                }`}
                onClick={() => setIsIndex(index)}
              >
                {item.icon === "home" ? (
                  <BsHouse className="size-6" />
                ) : item.icon === "explore" ? (
                  <MdOutlineTravelExplore className="size-6" />
                ) : item.icon === "notification" ? (
                  <IoMdNotificationsOutline className="size-6" />
                ) : item.icon === "message" ? (
                  <AiOutlineMail className="size-6" />
                ) : (
                  ""
                )}
                <span className="text-xl font-normal">{item.name}</span>
              </Link>
            ))}
            <div
              className={`absolute transition-all duration-300 ${
                pathname === "/"
                  ? "w-28 -left-4"
                  : pathname === "/explore"
                  ? "w-32 left-24"
                  : pathname === "/notifications"
                  ? "w-48 left-56"
                  : pathname === "/messages"
                  ? "w-36 left-[415px]"
                  : ""
              } h-full bg-primaryGreen-950`}
            ></div>
          </ul>
          <button></button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
