import { Link, useLocation } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
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
  const [isIndex, setIsIndex] = useState(0);
  const [isActiveDrop, setIsActiveDrop] = useState(false);
  return (
    <header className="w-full h-[90px] bg-secondBlack-700 text-white relative">
      <nav className="max-w-[1210px] w-full h-full mx-auto flex items-center justify-between relative">
        <h2 className="text-xl font-semibold tracking-widest">
          <span className="text-primaryGreen-400">Tech</span>Social
        </h2>
        <div className=" flex items-center h-full gap-x-10">
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
          <button
            to="/profile"
            className=" size-[55px] rounded-xl overflow-hidden"
            onClick={() => setIsActiveDrop(!isActiveDrop)}
          >
            <img
              src="/images/image-useroerfil.png"
              className="size-full object-cover"
              alt=""
            />
          </button>
        </div>
        <ul
          className={`${
            isActiveDrop ? " opacity-100" : " opacity-0"
          } z-20 transition-all duration-300 absolute top w-[120px] h-[85px] bg-secondBlack-700 rounded-xl top-20 right-0 flex flex-col items-center justify-center shadow-[0_0px_8px_0px_rgba(0,0,0,0.25)]`}
        >
          <div className="flex flex-col size-fit gap-y-3">
            <Link
              to={"/profile"}
              className=" flex items-center gap-x-2"
              onClick={() => setIsActiveDrop(false)}
            >
              <AiOutlineUser className="size-5" />
              Ver perfil
            </Link>
            <Link
              to={"#"}
              className=" flex items-center gap-x-2"
              onClick={() => setIsActiveDrop(false)}
            >
              <RxExit className="size-5" />
              Salir
            </Link>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
