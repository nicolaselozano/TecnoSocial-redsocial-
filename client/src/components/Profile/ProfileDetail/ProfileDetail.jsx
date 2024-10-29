/* eslint-disable react/prop-types */
import { FaCalendarAlt } from "react-icons/fa";
import perfilImg from "../../../assets/perfil/avatardeejemplo.svg";
import dataDecoder from "../../../helpers/dateDecoder";
import { getRoleColor } from "../../../helpers/get-role-color";

const ProfileDetail = ({
  user,
  redes,
  onEditProfile,
  followers,
  followeds,
}) => {
  

  return (
    <section className=" bg-secondBlack-700 w-full text-white rounded-t-xl overflow-hidden">
      {/* Sección del encabezado del perfil */}
      <header className="relative">
        {/* Imagen de fondo del perfil */}
        <img
          src="https://t4.ftcdn.net/jpg/04/95/28/65/240_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"
          alt="Background"
          className="w-full h-52  rounded-t-lg object-cover"
        />
        {/* Imagen de perfil del usuario */}
        <div className="absolute size-[150px] rounded-xl overflow-hidden top-28 left-4 border-2 border-gray-800">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className=" size-full object-cover"
            />
          ) : (
            <img
              src={perfilImg}
              alt="ProfileDefault"
              className="bg-gray-500 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
      </header>

      {/* Sección de detalles del perfil */}
      <article className="flex-row justify-between items-end py-4">
        <div className="px-6">
          {/* Correo electrónico del usuario */}
          <address className="text-secondBlack-100 ml-40 not-italic">
            {user.email}
          </address>

          {/* Información del usuario (nombre y roles) */}
          <div className="flex flex-row items-center justify-between pt-1">
            <div>
              <div
                className="flex items-center
                            "
              >
                {/* Nombre del usuario */}
                <h1 className="text-3xl font-semibold">{user.name}</h1>
                <div className="ml-4 flex justify-end">
                  <button
                    onClick={onEditProfile} // Llamamos la función para abrir el modal
                    className="border border-primaryGreen-400 text-primaryGreen-400 bg-transparent px-2 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white"
                  >
                    Editar perfil
                  </button>
                </div>
              </div>

              {/* Roles del usuario */}
              <div className="mt-2">
                {Array.isArray(user?.roles) > 0
                  ? user.roles.map((role, index) => (
                      <span
                        key={index}
                        className={`text-[12px] mr-1 px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize`}
                        style={{ backgroundColor: getRoleColor(role.name) }}
                      >
                        {role.name}
                      </span>
                    ))
                  : null}
              </div>
            </div>

            {/* Redes sociales del usuario */}
            <div>
              <nav className="flex flex-col items-end mb-1">
                {redes.length ? (
                  redes.map((item, index) => {
                    if (item.github) {
                      return (
                        <a key={index} href={item.github}>
                          Github
                        </a>
                      );
                    }
                    if (item.linkedin) {
                      return (
                        <a key={index} href={item.linkedin}>
                          LinkedIn
                        </a>
                      );
                    }
                  })
                ) : (
                  <span>isLoading...</span>
                )}
              </nav>
              {/* Fecha de creación del perfil */}
              <div className="flex gap-x-2 justify-center items-center mb-3 bg-primaryGreen-800 px-3 py-[6px] rounded-md">
                <FaCalendarAlt className=" text-primaryGreen-400" />
                <time className="text-primaryGreen-400">{dataDecoder(user.createdAt)}</time>
              </div>
            </div>
          </div>

          {/* Información adicional (trabajo, seguidores, seguidos, publicaciones) */}
          <div className="flex justify-between items-end space-x-6">
            {/* Descripcion del perfil profesional del usuario */}
            <div className="">
              <p className="text-white font-normal mt-3 text-base">
                {user.job}
              </p>
            </div>

            {/* Métricas del usuario (seguidores, seguidos, publicaciones) */}
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <div className="flex text-center items-center ml-3">
                  <p className="text-lg font-semibold mx-1">
                    {followers.totalUsers}
                  </p>
                  <p className="text-gray-400 text-sm">Seguidores</p>
                </div>
                <div className="flex text-center items-center ml-3">
                  <p className="text-lg font-semibold mx-1">
                    {followeds.totalUsers}
                  </p>
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
