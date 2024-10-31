import { useEffect, useState } from "react";
import { getRoleColor } from "../../helpers/get-role-color";

const CardPerfil = () => {
  const [isDataUser, setIsDataUser] = useState(
    JSON.parse(localStorage.getItem("userdata")) || ""
  );
  useEffect(() => {
    setIsDataUser(isDataUser);
  }, [isDataUser]);

  const { user } = isDataUser || "";

  return (
    <div className="flex items-start gap-x-2">
      <div className=" rounded-xl size-[70px] overflow-hidden">
        <img
          src={user ? user.avatar : ""}
          className="size-full object-cover"
          alt="imagen-perfil"
        />
      </div>
      <div className=" flex flex-col gap-y-2 ">
        <h2 className="text-xl font-semibold">Manuel rodriguez</h2>
        <ul className="flex gap-x-1">
          {user
            ? user.roles.map((item) => (
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
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default CardPerfil;
