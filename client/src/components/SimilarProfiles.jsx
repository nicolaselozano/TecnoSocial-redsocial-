import { useState } from "react";
import { create } from "zustand";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getRoleColor } from "../helpers/get-role-color";

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

  return (
    <div className="bg-[#25252A] text-white p-[12px] rounded-[12px] w-full min-h-[354px] mx-auto shadow-lg flex flex-col justify-between">
      <h2 className="text-lato text-[20px] font-semibold leading-[24px] w-full opacity-100 mb-4 text-left">
        Perfiles Similares
      </h2>
      <ul className="space-y-[12px]">
        {ListProfile.slice(-4).map((profile, index) => {
          //const roles = profile.role.split("/");
          return (
            <li key={index} className="flex items-start justify-between w-full">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-[55px] h-[55px] rounded-[12px] object-cover"
              />
              <div className="flex flex-col w-full max-w-[125px] gap-[6px] pl-2">
                <p className="text-md font-semibold truncate ">
                  {profile.name}
                </p>
                <div className="flex flex-wrap gap-[4px] w-full">
                  {profile.role.map((role, roleIndex) => (
                    <span
                      key={roleIndex}
                      className={`px-2 py-1 rounded-md text-xs truncate w-fit`}
                      style={{
                        backgroundColor: `${getRoleColor(role)}`,
                        borderLeft: `4px solid rgba(255,255,255,0.25)`,
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <button className="bg-transparent border p-0.5 border-[#43AA8B] text-[#43AA8B] rounded-[4px] hover:bg-[#43AA8B] hover:text-white transition-all size-[24px] flex justify-center items-center">
                <AiOutlineHeart className="size-full" />
              </button>
            </li>
          );
        })}
      </ul>
      {
        <div className="mt-4">
          <Link
            to="/similarprofiles"
            //onClick={handleShowMore}
            className="text-lato text-[12px] font-normal leading-[18px] text-primaryGreen-400 text-left text-xs border-b border-primaryGreen-400"
          >
            Ver más
          </Link>
        </div>
      }
    </div>
  );
};

export default SimilarProfiles;
