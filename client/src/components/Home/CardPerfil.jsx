import { useEffect, useState } from "react";
import { getRoleColor } from "../../helpers/get-role-color";

const CardPerfil = () => {
  const [isDataUser, setIsDataUser] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  useEffect(() => {
    setIsDataUser(isDataUser);
  }, [isDataUser]);

  /* console.log(isDataUser); */

  const { user } = isDataUser;

  return (
    <div className="flex items-start gap-x-2">
      <div className=" rounded-xl size-[70px] overflow-hidden">
        <img
          src={user.avatar || "images/image-useroerfil.png"}
          className="size-full object-cover"
          alt="imagen-perfil"
        />
      </div>
      <div className=" flex flex-col gap-y-2 ">
        <h2 className="text-xl font-semibold">Manuel rodriguez</h2>
        <ul className="flex gap-x-1">
          {user.roles.map((item) => (
            <li
              key={item.id}
              className={`px-2 py-1 rounded-md text-sm truncate`}
              style={{
                backgroundColor: `${getRoleColor(item.name)}`,
                borderLeft: `4px solid rgba(255,255,255,0.25)`,
              }}
            >
              {item.name}
            </li>
          ))}
          {/* <li
            className={`text-sm mr-1 px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize`}
            style={{ backgroundColor: getRoleColor("backend") }}
          >
            Backend
          </li>
          <li
            className={`text-sm mr-1 px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize`}
            style={{ backgroundColor: getRoleColor("frontend") }}
          >
            Frontend
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default CardPerfil;
