import { create } from 'zustand';

const useProfileStore = create((set) => ({
  profiles: [
    {
      name: "Santiago  Zarate",
      role: "Backend",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Nicolas Lozano ",
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
  ],
}));

const getRoleColorClass = (role) => {
  switch (role) {
    case "Backend":
      return "bg-backend";
    case "Frontend":
      return "bg-frontend";
    case "Devop / Tester":
      return "bg-tester";
    case "Devop / Frontend / Backend":
      return "bg-devop";
    default:
      return "bg-gray-600";
  }
};


const SimilarProfiles = () => {
  const { profiles } = useProfileStore();

  return (
    <div className="bg-gray-800 text-white p-6 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Perfiles Similares</h2>
      <ul className="space-y-4">
        {profiles.map((profile, index) => {
          const roleClass = getRoleColorClass(profile.role);
          return (
            <li
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-base font-medium">{profile.name}</p>
                <p
                  className={`text-xs text-white px-2 py-1 rounded ${roleClass}`}
                >
                  {profile.role}
                </p>
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-400">
                Seguir
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SimilarProfiles;
