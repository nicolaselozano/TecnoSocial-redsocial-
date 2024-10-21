import { useState } from 'react';
import { create } from 'zustand';
import { AiOutlineHeart } from 'react-icons/ai';

const useProfileStore = create((set) => ({
  profiles: [
    {
      name: "Santiago Zarate",
      role: "Backend",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Nicolas Lozano",
      role: "Frontend",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Ezequiel Garcia",
      role: "Devop / Tester",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Carolina Ojeda",
      role: "Devop / Frontend / Backend",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Lucas Fernandez",
      role: "Backend",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Juan Perez",
      role: "Frontend",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Ana Torres",
      role: "Tester",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Maria Lopez",
      role: "Devop",
      image: "https://via.placeholder.com/50",
    },
  ],
}));

const getRoleColorClass = (role) => {
  switch (role.trim()) {
    case "Backend":
      return "bg-blue-600 text-white px-2 py-1 rounded-full text-xs inline-block";
    case "Frontend":
      return "bg-purple-600 text-white px-2 py-1 rounded-full text-xs inline-block";
    case "Devop":
      return "bg-red-600 text-white px-2 py-1 rounded-full text-xs inline-block";
    case "Tester":
      return "bg-green-600 text-white px-2 py-1 rounded-full text-xs inline-block";
    default:
      return "bg-gray-600 text-white px-2 py-1 rounded-full text-xs inline-block";
  }
};

const SimilarProfiles = () => {
  const { profiles } = useProfileStore();
  const [currentPage, setCurrentPage] = useState(0);
  const profilesPerPage = 4;

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const visibleProfiles = profiles.slice(
    currentPage * profilesPerPage,
    (currentPage + 1) * profilesPerPage
  );

  return (
    <div className="bg-gray-700/30 text-white p-6 rounded-3xl shadow-lg w-[320px] h-[450px] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Perfiles Similares</h2>
      <ul className="space-y-4">
        {visibleProfiles.map((profile, index) => {
          const roles = profile.role.split("/");
          return (
            <li
              key={index}
              className="flex items-center"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-gray-300"
              />
              <div className="ml-4 flex-1">
                <p className="text-md font-semibold">{profile.name}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {roles.map((role, roleIndex) => (
                    <span key={roleIndex} className={getRoleColorClass(role)}>
                      {role.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-4">
                <button className="bg-transparent border border-green-500 text-green-500 p-1 rounded-md hover:bg-green-500 hover:text-white transition-all">
                  <AiOutlineHeart size={24} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {currentPage * profilesPerPage + profilesPerPage < profiles.length && (
        <div className="mt-4">
          <button
            onClick={handleShowMore}
            className="text-sm text-blue-400 hover:underline"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default SimilarProfiles;
