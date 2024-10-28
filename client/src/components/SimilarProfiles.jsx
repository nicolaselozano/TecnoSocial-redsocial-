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
      return "bg-[#1D2D44] text-white px-[6px] py-[2px] rounded-[3px] text-xs inline-block border-l-[1px] border-[#435BAA]";
    case "Frontend":
      return "bg-[#441D3F] text-white px-[6px] py-[2px] rounded-[3px] text-xs inline-block border-l-[1px] border-[#8F43AA]";
    case "Devop":
      return "bg-[#441D21] text-white px-[6px] py-[2px] rounded-[3px] text-xs inline-block border-l-[1px] border-[#AA434D]";
    case "Tester":
      return "bg-[#1D443F] text-white px-[6px] py-[2px] rounded-[3px] text-xs inline-block border-l-[1px] border-[#43AA9E]";
    default:
      return "bg-gray-900 text-white px-2 py-1 rounded-[3px] text-xs inline-block";
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
    <div className="bg-[#25252A] text-white p-[12px] rounded-[12px] w-full min-h-[354px] mx-auto shadow-lg flex flex-col justify-between">
      <h2 className="text-lato text-[20px] font-semibold leading-[24px] w-full opacity-100 mb-4 text-left">
        Perfiles Similares
      </h2>
      <ul className="space-y-[12px]">
        {visibleProfiles.map((profile, index) => {
          const roles = profile.role.split("/");
          return (
            <li
              key={index}
              className="flex items-start justify-between w-full"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-[55px] h-[55px] rounded-[12px] object-cover"
              />
              <div className="flex flex-col w-[150px] gap-[6px] pl-2">
                <p className="text-md font-semibold truncate ">{profile.name}</p>
                <div className="flex flex-wrap gap-[4px]">
                  {roles.map((role, roleIndex) => (
                    <span key={roleIndex} className={getRoleColorClass(role)}>
                      {role.name}
                    </span>
                  ))}
                </div>
              </div>
              <button className="bg-transparent border border-[#43AA8B] text-[#43AA8B] rounded-[4px] hover:bg-[#43AA8B] hover:text-white transition-all size-[20px] flex justify-center items-center">
                <AiOutlineHeart size={12} className=''/>
              </button>
            </li>
          );
        })}
      </ul>
      {currentPage * profilesPerPage + profilesPerPage < profiles.length && (
        <div className="mt-4">
          <button
            onClick={handleShowMore}
            className="text-lato text-[12px] font-normal leading-[18px] text-primaryGreen-400 hover:underline text-left text-xs border-b border-primaryGreen-400"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default SimilarProfiles;
