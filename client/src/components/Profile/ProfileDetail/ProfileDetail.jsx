/* eslint-disable react/prop-types */
import { FaCalendarAlt } from "react-icons/fa";
import { getRoleColor } from "../../../helpers/get-role-color";
import ProfileNav from "../ProfileNav";

const ProfileDetail = ({
    user,
    redes
}) => {
    console.log("HOLAAAAA", redes);

    return (
        <div className="mx-4 bg-secondBlack-700 text-white rounded-xl shadow-md overflow-hidden">
            <div className="relative">
                <img
                    src="https://t4.ftcdn.net/jpg/04/95/28/65/240_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"
                    alt="Background"
                    className="w-full h-32 object-cover"
                />
                <div className="absolute top-20 left-4 rounded-full border-4 border-gray-800">
                    <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
            </div>
            <div className="flex-row justify-between items-end m-4">
                <div className="px-6 pt-16 pb-6">


                    <div className="flex flex-row items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">{user.name}</h1>
                            <p className="text-gray-400">{user.email}</p>
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
                        <div>
                            <div className="flex flex-col items-end mb-1">
                                {
                                    redes.length ? redes.map((item, index) => {
                                        if (item.github) {
                                            return (
                                                <a key={index} href={item.github}>Github</a>
                                            )
                                        }
                                        if (item.linkedin) {
                                            return (
                                                <a key={index} href={item.linkedin}>Linkedin</a>
                                            )
                                        }

                                    }) : <span>isLoading...</span>
                                }
                            </div>
                            <div className="flex flex-row justify-center items-center 
                            mb-3
                            bg-primaryGreen-800 p-1 rounded-md">
                                <FaCalendarAlt className="mr-2 text-primaryGreen-400" />
                                <p className="text-primaryGreen-400">{user.createdAt}</p>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-between items-end space-x-6">
                        <p className="text-gray-400 mt-3 text-sm">
                            {user.job}
                        </p>
                        <div className="flex flex-col items-end">
                            <div className="flex">
                                <div className="text-center mr-2">
                                    <p className="text-lg font-semibold">60</p>
                                    <p className="text-gray-400 text-sm">Seguidores</p>
                                </div>
                                <div className="text-center mr-2">
                                    <p className="text-lg font-semibold">55</p>
                                    <p className="text-gray-400 text-sm">Seguidos</p>
                                </div>
                                <div className="text-center mr-2">
                                    <p className="text-lg font-semibold">120</p>
                                    <p className="text-gray-400 text-sm">Publicaciones</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileNav/>
        </div>
    );

};

export default ProfileDetail;
