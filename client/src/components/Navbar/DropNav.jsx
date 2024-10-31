import { AiOutlineUser } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { Link } from "react-router-dom";
import handleLogout from "../Auth/Logout/HandleLogout";

const DropNav = ({
  setIsIndex,
  setIsActiveDrop,
  isActiveDrop,
  userlogin,
  setIsModalOpenRegister,
  setIsModalOpenLogin,
}) => {
  return (
    <section
      className={`${
        isActiveDrop ? " opacity-100 z-20" : " opacity-0 -z-50"
      }  transition-all duration-300 absolute top w-[120px] h-[85px] bg-secondBlack-700 rounded-xl top-20 right-0 flex flex-col items-center justify-center shadow-[0_0px_8px_0px_rgba(0,0,0,0.25)]`}
    >
      {userlogin ? (
        <ul className="flex flex-col size-fit gap-y-3">
          <Link
            to={"/profile"}
            className=" flex items-center gap-x-2"
            onClick={() => {
              setIsIndex(null), setIsActiveDrop(false);
            }}
          >
            <AiOutlineUser className="size-5" />
            Ver perfil
          </Link>
          <Link
            to={"#"}
            className=" flex items-center gap-x-2"
            onClick={handleLogout}
          >
            <RxExit className="size-5" />
            Salir
          </Link>
        </ul>
      ) : (
        <ul className="flex flex-col size-fit gap-y-3">
          <Link
            className=" flex items-center gap-x-2"
            onClick={() => {
              setIsActiveDrop(false), setIsModalOpenLogin(true);
            }}
          >
            Iniciar Sesion
          </Link>
          <Link
            className=" flex items-center gap-x-2"
            onClick={() => {
              setIsActiveDrop(false), setIsModalOpenRegister(true);
            }}
          >
            Registrate
          </Link>
        </ul>
      )}
    </section>
  );
};

export default DropNav;
