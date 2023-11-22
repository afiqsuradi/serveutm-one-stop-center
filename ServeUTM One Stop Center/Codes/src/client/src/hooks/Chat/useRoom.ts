import useData from "../useData";
import { useAuth } from "../Auth/useAuth";
import { RoomType } from "@/interface/Chat";

const useRoom = (id: string) => {
  const { Auth } = useAuth();
  const { data, isLoading, error } = useData<RoomType>(
    `/api/chat/room/${id}`,
    {},
    [Auth.accessToken, id]
  );
  return { data, isLoading, error };
};

export default useRoom;
