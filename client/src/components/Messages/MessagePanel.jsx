import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getRoleColor } from "../../helpers/get-role-color";
import rolesData from "../../data/perfil-roles.json"; 


const socket = io("http://localhost:3000", {
  withCredentials: true
});


export const MessagePanel = () => {
  const userRoles = ["front"]
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);
  const [actualMessage, setActualMessage] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Escuchar eventos de Socket.IO
    socket.on("userList", (users) => {
      setUserList(users);
    });

    socket.on("initialMessages", (initialMessages) => {
      setMessages(initialMessages);
    });

    socket.on("chatMessage", (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Limpieza de eventos al desmontar el componente
    return () => {
      socket.off("userList");
      socket.off("initialMessages");
      socket.off("chatMessage");
    };
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  const RegisterUserSelect = () => {
    if (username) {
      socket.emit("registerUser", username);
    }
  };

  const handleMessageChange = (event) => {
    setActualMessage(event.target.value);
    console.log( actualMessage);
    
  };

  const handleSendMessage = () => {
    if (username && receiver && actualMessage) {
      const message = {
        senderId: username,
        receiverId: receiver,
        content: actualMessage,
        timestamp: new Date(),
      };

      // Enviar el mensaje al servidor
      socket.emit("chatMessage", message);

      // Agregar el mensaje localmente para que aparezca en la interfaz
      setMessages(prevMessages => [...prevMessages, message]);
      setActualMessage(""); // Limpiar el campo de mensaje
    }
  };


  return (
    <div className="w-2/3 bg-gray-750 p-6 flex flex-col">
      <div className="flex items-center mb-6">
        <img
          src="https://s3-alpha-sig.figma.com/img/b507/7505/752b6a568f75b00b6d076c212afff6a2?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iJGnKuRHHC7TYrNV3Kkir6iQ~~8Xb5CYRBX~dnC8cIwnMqtqOq1Y5FfeH8qllmg50DLJ3cxSc1xn3hsLDaAsxqwsAwZRe5o3XQu9AzgqSLSUXpAPyjHGVfvi5BeZ-cfJxl3309-EViM9117pV6Hlorh1dakdDKlWZ4oXAc7f7L5s9S4SydYcca6Qfp4BIrSepSASwwySGwdIdV1aEz4ixj4j8Ra~jGJwPbf9c0G0Fr-THWo~h8QTEgQik7BuWME0G6HuOCldcBh4GucfwUwX2ZrFQoCoRDgT3S60UU8l4qtSgxlNB7yCToUd~nJoE6u3bM1Mo3bPl88xEw6ienGwoA__"
          alt="Angela Leiva"
          className="w-16 h-16 rounded-full mr-5"
        />
        <div>
          <h2 className="text-2xl font-bold">Angela Leiva</h2>
          <div>
            {userRoles.map((role, index) => {
              const color = getRoleColor(role);
              return (
                <span
                  key={index}
                  className="text-white px-2 py-1 rounded-lg mr-2"
                  style={{ backgroundColor: color }}
                >
                  {role}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mostrar mensajes */}
      <div className="mb-4 bg-gray-800 p-4 rounded-lg flex flex-col space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4 bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Usuario</h3>
            <p className="text-gray-400 mt-2">{msg}</p>
          </div>
        ))}
      </div>

      {/* Input y botón para enviar mensajes */}
      <div className="mt-auto flex items-center">
        <input
          type="text"
          className="w-full p-4 rounded-lg bg-gray-700 text-white outline-none"
          value={actualMessage}
          onChange={handleMessageChange}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage} className="ml-4 p-4 bg-green-500 rounded-lg hover:bg-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9-7-9-7-9 7-9 7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessagePanel;
