/* eslint-disable react/prop-types */
import { useState } from "react";
import { getRoleColor } from "../../helpers/get-role-color";

const users = {
    name: "Eugenea Quevedo",
    role: ['Devops', 'Frontend', 'Backend'],
    avatar: "https://s3-alpha-sig.figma.com/img/2aaf/09de/c80b069b0f6f76a9f44fffc43c81b19d?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n1e2kUX8RIJy3IgpgPeVDFgFusxM3aYOiP3DX5WyyuKkq0qzj3oEbqIPMI8M7KNtLgvAs6ObcvqFyQcmQX4GLhP5ja7Uz5lQ-oHODaCl1l43GkiW9~SKddvK0wfhAOj~ZX7vDlmrmM7cTo45iBhNfIkRtM99t~2SIDPBrGjUXGGuXhsGcXuS7ObVDopt2dhq5ENTJV63kreRWq69mhzwYFPMBM9NimFdSm46BYPCglhbfXnkk5TNAezg2ZQB7V1oMi5~o~6r-nHF3edevMXE0SqQWjmEOU2ghL2lStXck12aUvbR-Y8XJwJApOyUGmb7ncRHD6k8tvPEhyFdZ2fCnQ__",
  };

export const MessageSidebar = ({
  userList,
  handleUser
}) => {

  const [actual,setActual] = useState(0);

  return (
    <div className="w-1/4 bg-gray-800 p-4">
      {Array.isArray(userList) && userList.map((user, index) => (
        <div
          key={index}
          className="flex items-center mb-4 p-2 hover:bg-green-900 hover:opacity-80 rounded-lg"
          onClick={() => handleUser(user.authId)}
        >
          <img
            src={user.avatar || users.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-[10px] mr-5"
          />
          <div>
            <h2 className="font-bold">{user.name}</h2>
            <div>
              {[users][0].role.map((role, roleIndex) => (
                <span
                  key={roleIndex}
                  className={`text-sm px-2 py-1 rounded-lg mt-2 mr-2`}
                  style={{ backgroundColor: getRoleColor(role.name) }}
                >
                  {role.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSidebar;
