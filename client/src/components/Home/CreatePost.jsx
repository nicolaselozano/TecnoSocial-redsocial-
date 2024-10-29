import { Link } from "react-router-dom";
import userProfileStore from "../../context/users/user-store";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

const CreatePost = () => {
  /* const { loading, userInstance } = userProfileStore(); */
  const [isDataUser, setIsDataUser] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  useEffect(() => {
    setIsDataUser(isDataUser);
  }, [isDataUser]);

  return (
    <article className=" w-full h-[100px] bg-secondBlack-700 flex items-center rounded-xl px-4 gap-x-3">
      <div className="size-[50px] rounded-xl bg-red-50 overflow-hidden">
        {isDataUser ? (
          <img
            src={isDataUser.user.avatar || "images/image-useroerfil.png"}
            className="size-full object-cover"
            alt="imagen-perfil"
          />
        ) : (
          <button className="text-white bg-secondBlack-900 flex items-center justify-center rounded-lg size-[55px]">
            <AiOutlineUser className="size-7" />
          </button>
        )}
      </div>
      <Link
        to={"/createpost"}
        type="text"
        className="w-full bg-secondBlack-400 h-[50px] rounded-xl px-2 py-3 text-left text-secondBlack-100"
      >
        ¿Quieres compartir algo?
      </Link>
    </article>
  );
};

export default CreatePost;
