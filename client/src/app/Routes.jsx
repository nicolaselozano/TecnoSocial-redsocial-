import { Route, Routes } from 'react-router-dom';
import RedirectLogin from '../components/Auth/Login/RedirectLogin';
import RedirectRegister from '../components/Auth/Register/RedirectRegister';
import AuthModal from '../components/AuthModals/AuthModal';
import { ExplorePage } from '../components/Explore/ExplorePage';
import Profile from '../components/Profile/Profile';
import Notification from '../view/Notificate/Notificate';
const AllRoutes = () => {

  return (
    <Routes>

      <Route path="/" element={<AuthModal/>}/>
      {/* Login */}
      <Route path="/redirect" element={<RedirectRegister />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
      {/* perfil */}
      <Route path="/profile/*" element={<Profile/>}/>
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/notificate" element={<Notification />} />
    </Routes>
  );
};

export default AllRoutes;
