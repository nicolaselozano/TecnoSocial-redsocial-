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
      return "bg-backend text-white px-2 py-1 rounded-full text-xs inline-block";
    case "Frontend":
      return "bg-frontend text-white px-2 py-1 rounded-full text-xs inline-block";
    case "Devop":
      return "bg-devop text-white px-2 py-1 rounded-full text-xs inline-block";
    case "Tester":
      return "bg-tester text-white px-2 py-1 rounded-full text-xs inline-block";
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
    <div className="bg-gray-800/80 text-white p-6 rounded-3xl shadow-md w-[300px] h-[425px] mx-auto">
      <h2 className="text-xl font-bold mb-4">Perfiles Similares</h2>
      <ul className="space-y-6">
        {visibleProfiles.map((profile, index) => {
          const roles = profile.role.split("/");
          return (
            <li
              key={index}
              className="flex items-center space-y-1"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium">{profile.name}</p>
                <div className="flex flex-wrap gap-1">
                  {roles.map((role, roleIndex) => (
                    <span key={roleIndex} className={getRoleColorClass(role)}>
                      {role.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <button className="ml-4 bg-transparent border border-green-500 text-green-500 p-2 rounded-xl hover:bg-green-500 hover:text-white transition-all">
                <AiOutlineHeart size={20} />
              </button>
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









