import { useLocation } from "react-router-dom";

const LayouteMain = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <main className="min-h-screen pt-16 text-white">
      <div className=" max-w-[1210px] mx-auto min-h-screen flex items-start gap-x-6">
        {/*card de informacion de usuario*/}
        <section className="bg-gray-400 w-[237px] h-[400px] rounded-xl"></section>
        {children}
        <div className=" flex flex-col gap-y-5">
          {/*card de perfiles similares*/}
          <section className="bg-gray-400 w-[237px] h-[400px] rounded-xl"></section>
          {/*card de notificaciones*/}
          {pathname !== "/notificate" && (
            <section className="bg-gray-400 w-[237px] h-[400px] rounded-xl"></section>
          )}
        </div>
      </div>
    </main>
  );
};

export default LayouteMain;
