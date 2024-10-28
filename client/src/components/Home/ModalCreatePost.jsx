import { Link } from "react-router-dom";
import CardPerfil from "./CardPerfil";
import FormModal from "./FormModal";

const ModalCreatePost = () => {
  return (
    <section
      className={`fixed top-0 left-0 w-full h-screen bg-secondBlack-900/70 backdrop-blur flex items-center justify-center z-30`}
    >
      <article className=" bg-secondBlack-700 rounded-xl w-[926px] h-fit px-8 py-6 gap-y-6 flex flex-col relative overflow-auto">
        <CardPerfil />
        <FormModal />
        <Link
          to={"/"}
          className="absolute right-6 top-3 font-semibold text-base"
        >
          X
        </Link>
      </article>
    </section>
  );
};

export default ModalCreatePost;
