import { Route, Routes } from "react-router-dom";
import RedirectLogin from "../components/Auth/Login/RedirectLogin";
import RedirectRegister from "../components/Auth/Register/RedirectRegister";
import AuthModal from "../components/AuthModals/AuthModal";
import { ExplorePage } from "../components/Explore/ExplorePage";
import Profile from '../layout/Profile';
import Notification from "../view/Notificate/Notificate";
<<<<<<< HEAD
import { NotificationBar } from "../components/Notification_bar/NotificationBar";
=======
import SimilarProfilesPage from "../components/Profile/SimilarProfilesPage";
>>>>>>> 18f5bb4fbdd2a035eb4abb2b94ce48dadf2d9f0d

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthModal />} />
      {/* Login */}
      <Route path="/redirect" element={<RedirectRegister />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
      {/* perfil */}
      <Route path="/profile/*" element={<Profile />} />
      {/* Paginas generales */}
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/notifications" element={<Notification />} />
<<<<<<< HEAD

      <Route path="/notificationsBar" element={<NotificationBar />} />

=======
      {/* Ruta Perfiles Similares */}
      <Route path="/similares" element={<SimilarProfilesPage/>}/>
>>>>>>> 18f5bb4fbdd2a035eb4abb2b94ce48dadf2d9f0d
    </Routes>
  );
};

export default AllRoutes;
