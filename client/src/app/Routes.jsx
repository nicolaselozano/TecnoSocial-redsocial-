import { Routes, Route } from 'react-router-dom';
import RedirectRegister from '../components/Auth/Register/RedirectRegister';
import RedirectLogin from '../components/Auth/Login/RedirectLogin';
import Profile from '../components/Profile/Profile';
import AuthModal from '../components/AuthModals/AuthModal';
const AllRoutes = () => {

  return (
    <Routes>

      <Route path="/" element={<AuthModal/>}/>
      {/* Login */}
      <Route path="/redirect" element={<RedirectRegister />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
      {/* perfil */}
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  );
};

export default AllRoutes;
