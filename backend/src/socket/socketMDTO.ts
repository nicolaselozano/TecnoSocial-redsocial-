/* eslint-disable prettier/prettier */
export interface UserSockets {
  [username: string]: string | null;
}

export interface MessageSocket {
  receiverId: string;
  content: string;
  timestamp: Date;
}

export const messages: MessageSocket[] = [];
