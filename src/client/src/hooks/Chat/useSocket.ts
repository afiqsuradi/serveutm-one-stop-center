import { BASE_URL } from "@/services/apiClient";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  message: (data: string) => void;
}

interface ClientToServerEvents {
  message: (data: string) => void;
}

const useSocket = () => {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
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

export default useSocket;
