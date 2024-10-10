import { Routes, Route } from 'react-router-dom';
import RedirectRegister from '../components/Auth/Register/RedirectRegister';
import RedirectLogin from '../components/Auth/Login/RedirectLogin';
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/redirect" element={<RedirectRegister />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
    </Routes>
  );
};

export default AllRoutes;
