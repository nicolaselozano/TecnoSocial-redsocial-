const ProfileDetail = () => {
    return (
        <div className="max-w-sm mx-auto bg-gray-800 text-white rounded-xl shadow-md overflow-hidden">
            <div className="relative">
                <img
                    src="https://placehold.co/600"
                    alt="Background"
                    className="w-full h-32 object-cover"
                />
                <div className="absolute top-20 left-4 rounded-full border-4 border-gray-800">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
            </div>
            <div className="px-6 pt-16 pb-6">
                <h1 className="text-xl font-semibold">Manuel Rodriguez</h1>
                <p className="text-gray-400">@manuRod6677</p>

                <div className="mt-4">
                    <span className="bg-blue-500 text-xs font-semibold text-white py-1 px-2 rounded-full">Backend</span>
                    <span className="bg-pink-500 text-xs font-semibold text-white py-1 px-2 rounded-full ml-2">Frontend</span>
                </div>

                <p className="text-gray-400 mt-3 text-sm">
                    Recibido en la UNLAM | Javascript | Css | Html | Angular | Zustand | SCREM | Node | Express | MongoDB
                </p>

                <div className="mt-6 flex justify-between items-center">
                    <div className="text-center">
                        <p className="text-lg font-semibold">60</p>
                        <p className="text-gray-400 text-sm">Seguidores</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold">55</p>
                        <p className="text-gray-400 text-sm">Seguidos</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold">120</p>
                        <p className="text-gray-400 text-sm">Publicaciones</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;
