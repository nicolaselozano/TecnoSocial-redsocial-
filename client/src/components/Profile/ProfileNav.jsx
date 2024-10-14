import { Link, useLocation } from "react-router-dom";

const ProfileNav = ({ user }) => {
    const location = useLocation();
    
    // Verificar si la ruta actual coincide con el path
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="mx-2 bg-secondBlack-700 text-white rounded-b-xl shadow-md overflow-hidden
        border-solid border-t-2 border-primaryGreen-400">
            <ul className="flex w-full">
                <li className={`flex-1 text-center px-2 py-3 cursor-pointer transition-colors duration-200 h-full ${
                    isActive('/profile') ? 'bg-primaryGreen-950 text-white' : 'hover:bg-primaryGreen-950 hover:text-white'
                }`}>
                    <Link className="w-full h-full block" to="">Posteo</Link>
                </li>
                <li className={`flex-1 text-center px-2 py-3 cursor-pointer transition-colors duration-200 h-full ${
                    isActive('/profile/followers') ? 'bg-primaryGreen-950 text-white' : 'hover:bg-primaryGreen-950 hover:text-white'
                }`}>
                    <Link className="w-full h-full block" to="followers">Seguidores</Link>
                </li>
                <li className={`flex-1 text-center px-2 py-3 cursor-pointer transition-colors duration-200 h-full ${
                    isActive('/profile/follows') ? 'bg-primaryGreen-950 text-white' : 'hover:bg-primaryGreen-950 hover:text-white'
                }`}>
                    <Link className="w-full h-full block" to="follows">Seguidos</Link>
                </li>
                <li className={`flex-1 text-center px-2 py-3 cursor-pointer transition-colors duration-200 h-full ${
                    isActive('/profile/likes') ? 'bg-primaryGreen-950 text-white' : 'hover:bg-primaryGreen-950 hover:text-white'
                }`}>
                    <Link className="w-full h-full block" to="likes">Me gusta</Link>
                </li>
            </ul>
        </nav>
    );
};

export default ProfileNav;
