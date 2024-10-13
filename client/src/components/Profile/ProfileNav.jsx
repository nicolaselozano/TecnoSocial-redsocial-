import { Link } from "react-router-dom";

const ProfileNav = ({
    user
}) => {
    return (
        <nav className="mx-2 bg-secondBlack-700 text-white rounded-b-xl shadow-md overflow-hidden
        border-solid border-t-2 border-primaryGreen-400">
            <ul className="flex w-full">
                <li className="flex-1 text-center hover:bg-primaryGreen-950 hover:text-white px-2 py-3 cursor-pointer transition-colors duration-200 h-full">
                    <Link to="post">Posteo</Link>
                </li>
                <li className="flex-1 text-center hover:bg-primaryGreen-950 hover:text-white px-2 py-3 cursor-pointer transition-colors duration-200 h-full">
                    <Link to="followers">Seguidores</Link>
                </li>
                <li className="flex-1 text-center hover:bg-primaryGreen-950 hover:text-white px-2 py-3 cursor-pointer transition-colors duration-200 h-full">
                    <Link to="follows">Seguidos</Link>
                </li>
                <li className="flex-1 text-center hover:bg-primaryGreen-950 hover:text-white px-2 py-3 cursor-pointer transition-colors duration-200 h-full">
                <Link to="likes">Me gusta</Link>
                </li>
            </ul>
        </nav>
    );
};

export default ProfileNav;