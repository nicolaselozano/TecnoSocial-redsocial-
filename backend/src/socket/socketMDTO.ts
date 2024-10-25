/* eslint-disable prettier/prettier */
export interface UserSockets {
    [username: string]: string;
}

export interface Message {
    receiverId: string;
    content: string;
    timestamp: Date;
}

export const messages: Message[] = [];
