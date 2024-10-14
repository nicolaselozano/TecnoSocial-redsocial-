import { Routes, Route } from 'react-router-dom';
import RedirectRegister from '../components/Auth/Register/RedirectRegister';
import RedirectLogin from '../components/Auth/Login/RedirectLogin';
import { ExplorePage } from '../components/Explore/ExplorePage';
import Notificate from '../view/Notificate/Notificate';
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/redirect" element={<RedirectRegister />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/notificate" element={<Notificate />} />
    </Routes>
  );
};

export default AllRoutes;
