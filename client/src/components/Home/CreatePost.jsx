import { Link } from "react-router-dom";

const CreatePost = () => {
  return (
    <article className=" w-full h-[100px] bg-secondBlack-700 flex items-center rounded-xl px-4 gap-x-3">
      <div className="size-[50px] rounded-xl bg-red-50 overflow-hidden">
        <img
          src="images/image-useroerfil.png"
          className="size-full object-cover"
          alt="imagen-perfil"
        />
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
