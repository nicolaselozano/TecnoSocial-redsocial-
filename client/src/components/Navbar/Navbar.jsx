import { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsHouse } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineTravelExplore } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import DropNav from "./DropNav";
import { checkAuth } from "../../services/Auth/checkAuth";
import AuthModal from "../AuthModals/AuthModal";
import userProfileStore from "../../context/users/user-store";
import AuthButton from "../Buttons/AuthButtons";
import handleLogout from "../Auth/Logout/HandleLogout";

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
  }
];
const authNavList = [
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
  const { loading,userInstance } = userProfileStore();
  const [isIndex, setIsIndex] = useState(null);
  const [isActiveDrop, setIsActiveDrop] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("empezando");

    const checkUserAuth = async () => {
      if (!loading) {
        const auth = await checkAuth();
        setIsAuthenticated(auth);
        console.log("terminado");

      }
    };

    checkUserAuth();
  }, [loading]);


  useEffect(() => {
    setIsIndex(isIndex);
  }, [pathname]);
  //console.log(isIndex);

  return (
    <header className="w-full h-[90px] bg-secondBlack-700 text-white relative">
      <nav className="max-w-[1210px] w-full h-full mx-auto flex items-center justify-between relative">
        <Link
          to={"/"}
          onClick={() => setIsIndex(0)}
          className="text-xl font-semibold tracking-widest"
        >
          <span className="text-primaryGreen-400">Tech</span>Social
        </Link>
        {/* Lista de navegacion */}
        <section className=" flex items-center h-full gap-x-10">
          <ul className={`flex items-center gap-x-8 relative h-full`}>
            {isAuthenticated ?
              [...listNav, ...authNavList].map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  className={`relative flex items-center gap-x-1 z-10 transition-all duration-100 ${isIndex === index ? "text-primaryGreen-400" : ""
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
                  <span className="text-lg font-normal">{item.name}</span>
                  {(item.icon === "notification" || item.icon === "message") && (
                    <span className="absolute -right-2 -top-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryGreen-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primaryGreen-400"></span>
                    </span>
                  )}
                </Link>
              )) :
              listNav.map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  className={`relative flex items-center gap-x-1 z-10 transition-all duration-100 ${isIndex === index ? "text-primaryGreen-400" : ""
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
                  <span className="text-lg font-normal">{item.name}</span>
                  {(item.icon === "notification" || item.icon === "message") && (
                    <span className="absolute -right-2 -top-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryGreen-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primaryGreen-400"></span>
                    </span>
                  )}
                </Link>))
            }
            <div
              className={`absolute transition-all duration-300 ${pathname === "/"
                ? "w-28 -left-4"
                : pathname === "/explore"
                  ? "w-28 left-24"
                  : pathname === "/notifications"
                    ? "w-40 left-56"
                    : pathname === "/messages"
                      ? "w-32 left-[395px]"
                      : ""
                } h-full bg-primaryGreen-950`}
            ></div>
          </ul>
          {
            isAuthenticated ?
              <div className="flex  flex-row">
                <button
                  to="/profile"
                  className=" size-[55px] rounded-xl overflow-hidden"
                  onClick={() => setIsActiveDrop(!isActiveDrop)}
                >
                  <img
                    src={userInstance.user.avatar || "/images/image-useroerfil.png"}
                    className="size-full object-cover"
                    alt=""
                  />
                </button>
                <AuthButton name={"LogOut"} onClick={handleLogout} />
              </div>

              :
              <div>
                <AuthModal />
              </div>
          }
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
