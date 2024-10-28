import { useEffect, useState } from "react";
import userProfileStore from "../../context/users/user-store";
// asset imagen
import perfilImg from "../../assets/perfil/avatardeejemplo.svg";
import { getRoleColor } from "../../helpers/get-role-color";
import userFollowersStore from "../../context/users/followers-store";

const SideProfileCard = () => {
    const { fetchUserDetail, userInstance, loading } = userProfileStore();
    const { getFollowers, getFolloweds, follower, followed } = userFollowersStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(loading);
        console.log(userInstance);
    }, [loading]);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            await fetchUserDetail();
            await getFollowers();
            await getFolloweds();
            setIsLoading(false);
        };
        fetchUserData();
        console.log(userInstance);
    }, [fetchUserDetail,getFollowers,getFolloweds]);

    return (
        <section className={`bg-secondBlack-700 text-white rounded-xl shadow-md overflow-hidden ${isLoading ? 'invisible' : 'visible'}`}>
            {/* Sección del encabezado del perfil */}

            <header className="relative">
                {
                    isLoading ?
                        <div>
                            {/* Imagen ejemplo de fondo del perfil */}
                            <div className="bg-gray-500 rounded-t-lg w-full h-52" />
                            {/* Imagen ejemplo de perfil del usuario */}
                            <div className="absolute top-36 left-4 rounded-full border-4 border-gray-800">
                                <div className="bg-gray-500 w-24 h-24 rounded-full object-cover" />

                            </div>
                        </div> :
                        <div>
                            {/* Imagen de fondo del perfil */}
                            <img
                                src="https://t4.ftcdn.net/jpg/04/95/28/65/240_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"
                                alt="Background"
                                className="w-full h-28 object-cover"
                            />
                            {/* Imagen de perfil del usuario */}
                            <div className="absolute top-16 left-4 rounded-xl border-4 border-gray-800">
                                {
                                    userInstance.user?.avatar ?
                                        <img
                                            src={userInstance.user.avatar}
                                            alt="Profile"
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                        :
                                        <img src={perfilImg}
                                            alt="ProfileDefault"
                                            className="bg-gray-500 w-24 h-24 rounded-full object-cover" />
                                }
                            </div>
                        </div>

                }

            </header>

            {/* Sección de detalles del perfil */}
            <article className="m-4">
                <div className="">
                    {/* Correo electrónico del usuario */}

                    <h2 className="text-xl font-semibold mt-8">{userInstance.user.name || 'Usuario'}</h2>

                    {/* Información del usuario (nombre y roles) */}
                    <div className="flex flex-col justify-start items-start">
                        <address className="text-secondBlack-100 not-italic">{userInstance.user.email}</address>


                        {/* Roles del usuario, ahora centrados y distribuidos */}
                        <div className="mt-1 flex flex-grid justify-center items-center space-x-1">
                            {
                                Array.isArray(userInstance.user?.roles) ? userInstance.user?.roles?.map((role, index) => (
                                    <span
                                        key={index}
                                        className={`text-sm px-4 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize`}
                                        style={{ backgroundColor: getRoleColor(role.name) }}
                                    >
                                        {role.name}
                                    </span>
                                )):null
                            }
                        </div>
                    </div>

                    {/* Información adicional (trabajo, seguidores, seguidos, publicaciones) */}
                    <div className="flex flex-col justify-start items-start space-y-4 mt-1">
                        <p className="text-white text-sm">{userInstance.user.job || 'Sin información laboral'}</p>

                        {/* Métricas del usuario (seguidores, seguidos, publicaciones) */}
                        <div className="flex flex-row m-1 justify-between w-full">
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-semibold">{follower.totalUsers}</p>
                                <p className="text-gray-400 text-sm">Seguidores</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-semibold">{followed.totalUsers}</p>
                                <p className="text-gray-400 text-sm">Seguidos</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-semibold">120</p>
                                <p className="text-gray-400 text-sm">Publicaciones</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default SideProfileCard;
