import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { getRoleColor } from "../../helpers/get-role-color";
import { APIDOMAIN } from '../../../vars';
import userProfileStore from '../../context/users/user-store';
import { BsFillSendFill } from "react-icons/bs";

const socket = io(`${APIDOMAIN}`, {
  withCredentials: true
});

export const MessagePanel = ({ currentUser }) => {
  const { userInstance, fetchUserDetail } = userProfileStore();
  const userRoles = ["front"];
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);
  const [actualMessage, setActualMessage] = useState("");

  useEffect(() => {

    if (receiver && currentUser.authId) {
      socket.emit("registerUser", receiver);
      console.log("Usuario registrado con authId:", currentUser.authId);

      socket.on("initialMessages", (initialMessages) => {
        setMessages(initialMessages);
      });

      socket.on("chatMessage", (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }


    return () => {
      socket.off("initialMessages");
      socket.off("chatMessage");
    };
  }, [receiver]);

  useEffect(() => {

    console.log(currentUser);

    if (currentUser && currentUser.authId) {
      setReceiver(currentUser.authId);
      fetchUserDetail();
      console.log('Receptor:', currentUser, userInstance);

    }
  }, [currentUser, receiver]);

  const handleMessageChange = (event) => {
    setActualMessage(event.target.value);
  };
  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  const handleSendMessage = () => {
    if (receiver && actualMessage) {
      const message = {
        receiverId: receiver,
        content: actualMessage,
        timestamp: new Date(),
      };

      socket.emit("chatMessage", message);
      setMessages(prevMessages => [...prevMessages, message]);
      setActualMessage("");
    }
  };
  const messageEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
      if (messageEndRef.current) {
          messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  }, [messages]); // Dependency on messages

  return (
      <div className="w-2/3 bg-secondBlack-700 p-6 flex flex-col shadow-lg">

          {/* Mostrar mensajes */}
          <div className="mb-4 bg-secondBlack-900 p-4 rounded-lg flex flex-col space-y-4 overflow-y-auto h-96">
              {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.receiverId === currentUser.authId ? 'justify-end' : 'justify-start'}`}>
                      <div className='flex flex-col'>
                          <h3 className={`font-bold text-lg text-white ${msg.receiverId === currentUser.authId ? 'text-right' : 'text-left'}`}>
                              {msg.receiverId === currentUser.authId ? userInstance.user.name : currentUser.name}
                          </h3>
                          <div
                              className={`mb-2 p-2 rounded-lg ${msg.receiverId === currentUser.authId ? 'bg-primaryGreen-800 text-right' : 'bg-gray-800 text-left'} inline-block`}
                              style={{ backgroundColor: msg.receiverId === currentUser.authId ? '#1D443A' : '#4B5563' }}
                          >
                              <p className="text-gray-300 mt-2">{msg.content}</p>
                          </div>
                      </div>
                  </div>
              ))}
              {/* Reference div for scrolling to the bottom */}
              <div ref={messageEndRef} />
          </div>

          {/* Input y botón para enviar mensajes */}
          <div className="mt-auto flex items-center">
              <input
                  type="text"
                  className="w-full p-4 rounded-lg bg-secondBlack-800 text-black outline-none border border-primaryGreen-400"
                  value={actualMessage}
                  onChange={handleMessageChange}
                  placeholder="Escribe un mensaje..."
              />
              <button onClick={handleSendMessage} className="ml-4 p-4 bg-primaryGreen-400 rounded-lg hover:bg-primaryGreen-600">
              <BsFillSendFill />
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 19l9-7-9-7-9 7-9 7z"
                      />

              </button>
          </div>
      </div>
  );
};

export default MessagePanel;
