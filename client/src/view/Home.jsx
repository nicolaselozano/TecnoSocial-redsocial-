import { useState } from "react";
import LayouteMain from "../layout/LayouteMain";

const HomePage = () => {
  const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
  return (
    <LayouteMain>
      <section className="h-full w-full flex flex-col gap-y-5">
        <article className=" w-full h-[100px] bg-secondBlack-700 flex items-center rounded-xl px-4 gap-x-3">
          <div className="size-[50px] rounded-xl bg-red-50 overflow-hidden">
            <img
              src="images/image-useroerfil.png"
              className="size-full object-cover"
              alt="imagen-perfil"
            />
          </div>
          <button
            type="text"
            className="w-full bg-secondBlack-400 h-[50px] rounded-xl px-2 py-3 text-left text-secondBlack-100"
          >
            ¿Quieres compartir algo?
          </button>
        </article>
        <article>
            
        </article>
      </section>
    </LayouteMain>
  );
};

export default HomePage;
