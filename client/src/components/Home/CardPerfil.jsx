import { getRoleColor } from "../../helpers/get-role-color";

const CardPerfil = () => {
  return (
    <div className="flex items-start gap-x-2">
      <div className=" rounded-xl size-[70px] overflow-hidden">
        <img
          src="images/image-useroerfil.png"
          className="size-full object-cover"
          alt="imagen-perfil"
        />
      </div>
      <div className=" flex flex-col gap-y-2 ">
        <h2 className="text-xl font-semibold">Manuel rodriguez</h2>
        <div className="flex gap-x-1">
          <span
            className={`text-sm mr-1 px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize`}
            style={{ backgroundColor: getRoleColor("backend") }}
          >
            Backend
          </span>
          <span
            className={`text-sm mr-1 px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize`}
            style={{ backgroundColor: getRoleColor("frontend") }}
          >
            Frontend
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardPerfil;
