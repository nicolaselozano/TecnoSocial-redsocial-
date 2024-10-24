import { useLocation } from "react-router-dom";
import SideProfileCard from "../components/SideProfileCard/SideProfileCard";
import SimilarProfilesPage from "../components/Profile/SimilarProfilesPage";
import NotificationBar from "../components/Notification_bar/NotificationBar";

const LayouteMain = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <main className="min-h-screen pt-16 text-white relative">
      <div className=" max-w-[1210px] w-full mx-auto min-h-screen flex items-start gap-x-6">
        {/*card de informacion de usuario*/}
        <section className="bg-gray-400 h-auto rounded-xl">
          <SideProfileCard />
        </section>
        {children}
        <section className=" flex flex-col gap-y-5 ">
          {/*card de perfiles similares*/}
          <SimilarProfilesPage />
          {/*card de notificaciones*/}
          {pathname !== "/notifications" && <NotificationBar />}
        </section>
      </div>
    </main>
  );
};

export default LayouteMain;
