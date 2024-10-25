/* eslint-disable prettier/prettier */
import { Server, Socket } from 'socket.io';
import { UserSockets, Message, messages } from './socketMDTO';
import cookieParser from 'cookie';
import { validateSocketToken } from '@/utils/validateSocketToken';

const userSockets: UserSockets = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initializeMSocketIO = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    io.on("connection", (socket: Socket) => {

        socket.on("registerUser", async () => {
            console.log("Un cliente se ha conectado:", socket.id);
            const cookies = await cookieParser.parse(socket.handshake.headers.cookie || '');
            console.log('Cookies:', cookies);
            const { authId } = await validateSocketToken(cookies.token);
    
            console.log('authId del usuario registrado : ', authId);

            userSockets[authId] = socket.id;
            io.emit("userList", Object.keys(userSockets));
            socket.emit("initialMessages", messages);
        });

        socket.on("chatMessage", async (message: Message) => {
            console.log("Un cliente se ha conectado:", socket.id);
            const cookies = await cookieParser.parse(socket.handshake.headers.cookie || '');
            console.log('Cookies:', cookies);
            const { authId } = await validateSocketToken(cookies.token);
    
            console.log('authId del usuario registrado : ', authId);
            console.log("Mensaje recibido:", message);
            
            messages.push(message);
            const receiverSocketId = userSockets[message.receiverId];
            console.log(userSockets[authId], userSockets[message.receiverId]);

            if (receiverSocketId) {
                console.log("mandando mensaje al receptor", message);

                io.to(receiverSocketId).emit("chatMessage", message);
            }
        });

        socket.on("disconnect", () => {
            console.log("Un cliente se ha desconectado:", socket.id);
            for (const [user, id] of Object.entries(userSockets)) {
                if (id === socket.id) {
                    delete userSockets[user];
                    io.emit("userList", Object.keys(userSockets));
                    break;
                }
            }
        });
    });

    return io;
};
