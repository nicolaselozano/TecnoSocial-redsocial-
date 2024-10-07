import { Routes, Route } from 'react-router-dom';
import RedirectRegister from '../components/Auth/Redirect/RedirectRegister';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/redirect" element={<RedirectRegister />} />
    </Routes>
  );
};

export default AllRoutes;
