import { useState } from 'react';
import RegisterModal from '../components/Auth/Register/RegisterModal';
import AllRoutes from './Routes';
import LoginModal from '../components/Auth/Login/LoginModal';
import handleLogout from '../components/Auth/Logout/HandleLogout';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

  return (
    <div /* className="min-h-screen flex items-center justify-center" */ className='min-h-full '>
      {/* <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Registrarte
      </button>
      <button
        onClick={() => setIsModalOpenLogin(true)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>
      <button
        onClick={handleLogout}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Logout
      </button> */}
      {/* todas las rutas */}
      <AllRoutes />

      {isModalOpen && <RegisterModal onClose={setIsModalOpen} />}
      {isModalOpenLogin && <LoginModal onClose={setIsModalOpenLogin} />}
    </div>
  );
}

export default App;
