import { useEffect, useState } from "react";
import { create } from "zustand";
import { AiOutlineHeart } from "react-icons/ai";
import similarsUserStore from "../context/users/similars_user_store";
import { FollowService } from "../services/follows/new_follow";
import { Link } from "react-router-dom";

const ListProfile = [
  {
    name: "Santiago Zarate",
    role: ["Business Analyst"],
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Nicolas Lozano",
    role: ["Frontend"],
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Ezequiel Garcia",
    role: ["Devop", "Tester"],
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Carolina Ojeda",
    role: ["Devop", "Frontend", "Backend"],
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Lucas Fernandez",
    role: ["Network Engineer"],
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Juan Perez",
    role: ["UI/UX Designer", "IT Support Specialist"],
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Ana Torres",
    role: ["Business Analyst", "Product Manager"],
    image: "https://via.placeholder.com/50",
  },
  {
    name: "Maria Lopezzzzzzzzzzzzzzz",
    role: ["Systems Administrator"],
    image: "https://via.placeholder.com/50",
  },
];

const SimilarProfiles = () => {
  //const { profiles } = useProfileStore();
  const { similarUsers, page, loading, error, fetchUsers, reset } =
    similarsUserStore();
  const [isloading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const profilesPerPage = 4;

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      await fetchUsers(currentPage);
      setIsLoading(false);
    };
    fetchUserData();

    return () => {
      reset();
    };
  }, [fetchUsers, currentPage]);

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleFollowUser = (user) => {
    const { authId } = user;

    FollowService.setNewFollower(authId);
  };

  const visibleProfiles = similarUsers.slice(
    0,
    (currentPage + 1) *
      (profilesPerPage > similarUsers.length
        ? similarUsers.length
        : profilesPerPage)
  );

  console.log(visibleProfiles)

  return (
    <div className="bg-[#25252A] text-white p-[12px] rounded-[12px] w-full min-h-[354px] mx-auto shadow-lg flex flex-col h-fit">
      <h2 className="text-lato text-[20px] font-semibold leading-[24px] w-full opacity-100 mb-4 text-left ">
        Perfiles Similares
      </h2>
      <ul className="flex flex-col items-start h-full gap-y-3 ">
        {visibleProfiles.map((profile) => (
          <li
            key={profile.id}
            className="flex items-start justify-between w-full"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-[55px] h-[55px] rounded-[12px] object-cover"
            />
            <div className="flex flex-col w-[150px] gap-[6px] pl-2">
              <p className="text-md font-semibold truncate ">{profile.name}</p>
              <div className="flex flex-wrap gap-[4px]">
                {profile.roles.map((role, roleIndex) => (
                  <span key={roleIndex} className={getRoleColorClass(role)}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <button
              className="bg-transparent border border-[#43AA8B] text-[#43AA8B] rounded-[4px] hover:bg-[#43AA8B] hover:text-white transition-all size-[20px] flex justify-center items-center"
              onClick={() => handleFollowUser(profile)}
            >
              <AiOutlineHeart size={12} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link
          to="/similarprofiles"
          //onClick={handleShowMore}
          className="text-lato text-[12px] font-normal leading-[18px] text-primaryGreen-400 text-left text-xs border-b border-primaryGreen-400"
        >
          Ver más
        </Link>
      </div>
      
    </div>
  );
};

export default SimilarProfiles;
