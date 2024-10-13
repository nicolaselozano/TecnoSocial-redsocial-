/* eslint-disable react/prop-types */
import { FaCalendarAlt } from "react-icons/fa";
import { getRoleColor } from "../../../helpers/get-role-color";
import perfilImg from "../../../assets/perfil/avatardeejemplo.svg";

const ProfileDetail = ({
    user,
    redes
}) => {

    return (
        <section className="mx-2 bg-secondBlack-700 text-white rounded-t-xl shadow-md overflow-hidden">
            {/* Sección del encabezado del perfil */}
            <header className="relative">
                {/* Imagen de fondo del perfil */}
                <img
                    src="https://t4.ftcdn.net/jpg/04/95/28/65/240_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"
                    alt="Background"
                    className="w-full h-32 object-cover"
                />
                {/* Imagen de perfil del usuario */}
                <div className="absolute top-20 left-4 rounded-full border-4 border-gray-800">
                    {
                        user?.avatar ?
                            <img
                                src={user.avatar}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            :
                            <img src={perfilImg}
                                alt="ProfileDefault"
                                className="bg-gray-500 w-24 h-24 rounded-full object-cover" />

                    }

                </div>
            </header>

            {/* Sección de detalles del perfil */}
            <article className="flex-row justify-between items-end m-4">
                <div className="px-6">
                    {/* Correo electrónico del usuario */}
                    <address className="text-gray-400 ml-24 not-italic">{user.email}</address>

                    {/* Información del usuario (nombre y roles) */}
                    <div className="flex flex-row items-center justify-between">
                        <div>
                            {/* Nombre del usuario */}
                            <h1 className="text-xl font-semibold">{user.name}</h1>
                            {/* Roles del usuario */}
                            <div className="mt-2">
                                {user.roles.map((role, index) => (
                                    <span
                                        key={index}
                                        className={`text-sm mr-1 px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize`}
                                        style={{ backgroundColor: getRoleColor(role) }}
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Redes sociales del usuario */}
                        <div>
                            <nav className="flex flex-col items-end mb-1">
                                {
                                    redes.length ? redes.map((item, index) => {
                                        if (item.github) {
                                            return (
                                                <a key={index} href={item.github}>Github</a>
                                            )
                                        }
                                        if (item.linkedin) {
                                            return (
                                                <a key={index} href={item.linkedin}>LinkedIn</a>
                                            )
                                        }
                                    }) : <span>isLoading...</span>
                                }
                            </nav>
                            {/* Fecha de creación del perfil */}
                            <div className="flex flex-row justify-center items-center mb-3 bg-primaryGreen-800 p-1 rounded-md">
                                <FaCalendarAlt className="mr-2 text-primaryGreen-400" />
                                <time className="text-primaryGreen-400">{user.createdAt}</time>
                            </div>
                        </div>
                    </div>

                    {/* Información adicional (trabajo, seguidores, seguidos, publicaciones) */}
                    <div className="flex justify-between items-end space-x-6">
                        {/* Trabajo del usuario */}
                        <div className="">
                            <p className="text-gray-400 mt-3 text-sm">
                                {user.job}
                            </p>
                        </div>

                        {/* Métricas del usuario (seguidores, seguidos, publicaciones) */}
                        <div className="flex flex-col items-end">
                            <div className="flex items-center">
                                <div className="flex text-center items-center ml-3">
                                    <p className="text-lg font-semibold mx-1">60</p>
                                    <p className="text-gray-400 text-sm">Seguidores</p>
                                </div>
                                <div className="flex text-center items-center ml-3">
                                    <p className="text-lg font-semibold mx-1">55</p>
                                    <p className="text-gray-400 text-sm">Seguidos</p>
                                </div>
                                <div className="flex text-center items-center ml-3">
                                    <p className="text-lg font-semibold mx-1">120</p>
                                    <p className="text-gray-400 text-sm">Publicaciones</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );

};

export default ProfileDetail;
