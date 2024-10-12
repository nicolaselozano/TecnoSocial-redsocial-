const ProfileNav = ({
    user
}) => {
    return (
        <div className="mx-2 bg-secondBlack-700 text-white rounded-b-xl shadow-md overflow-hidden
        border-solid border-t-2 border-primaryGreen-400">
            <ul className="flex w-full">
                <li className="flex-1 text-center hover:bg-primaryGreen-950 hover:text-white px-2 py-3 cursor-pointer transition-colors duration-200 h-full">
                    Posteo
                </li>
                <li className="flex-1 text-center hover:bg-primaryGreen-950 hover:text-white px-2 py-3 cursor-pointer transition-colors duration-200 h-full">
                    Seguidores
                </li>
                <li className="flex-1 text-center hover:bg-primaryGreen-950 hover:text-white px-2 py-3 cursor-pointer transition-colors duration-200 h-full">
                    Seguidos
                </li>
                <li className="flex-1 text-center hover:bg-primaryGreen-950 hover:text-white px-2 py-3 cursor-pointer transition-colors duration-200 h-full">
                    Me Gusta
                </li>
            </ul>
        </div>
    );
};

export default ProfileNav;