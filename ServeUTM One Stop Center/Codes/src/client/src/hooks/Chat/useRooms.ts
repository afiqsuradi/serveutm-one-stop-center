import useData from "../useData";
import { useAuth } from "../Auth/useAuth";
import { RoomType } from "@/interface/Chat";

interface RoomsResponseData {
  room_id: RoomType["room_id"];
  createdAt: RoomType["createdAt"];
  participants: RoomType["participants"];
}

interface RoomsResponse {
  count: number;
  data: RoomsResponseData[];
}

const useRooms = () => {
  const { Auth } = useAuth();
  const { data, isLoading, error } = useData<RoomsResponse>(
    "/api/chat/rooms",
    {},
    [Auth.accessToken]
  );
  return { data, isLoading, error };
};

export default useRooms;
