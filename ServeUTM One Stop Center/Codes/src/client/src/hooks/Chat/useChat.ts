import { RoomMessageType } from "@/interface/Chat";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/interface/ChatSocket";
import { BASE_URL } from "@/services/apiClient";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export type MessageRequestType = {
  message: string | FormData;
  type: RoomMessageType["type"];
};

const useChat = () => {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents<RoomMessageType>,
    ClientToServerEvents<MessageRequestType>
  > | null>(null);

  useEffect(() => {
    const newSocket = io(BASE_URL);
    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  return { socket };
};

export default useChat;
