import { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsHouse } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineTravelExplore } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import DropNav from "./DropNav";

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
  const [isIndex, setIsIndex] = useState(null);
  const [isActiveDrop, setIsActiveDrop] = useState(false);

  useEffect(() => {
    setIsIndex(isIndex);
  }, [pathname]);
  //console.log(isIndex);

  return (
    <header className="w-full h-[90px] bg-secondBlack-700 text-white relative">
      <nav className="max-w-[1210px] w-full h-full mx-auto flex items-center justify-between relative">
        <h2 className="text-xl font-semibold tracking-widest">
          <span className="text-primaryGreen-400">Tech</span>Social
        </h2>
        {/* Lista de navegacion */}
        <section className=" flex items-center h-full gap-x-10">
          <ul className={`flex items-center gap-x-8 relative h-full`}>
            {listNav.map((item, index) => (
              <Link
                key={index}
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
        </section>
        <DropNav
          setIsIndex={setIsIndex}
          setIsActiveDrop={setIsActiveDrop}
          isActiveDrop={isActiveDrop}
        />
      </nav>
    </header>
  );
};

export default Navbar;
