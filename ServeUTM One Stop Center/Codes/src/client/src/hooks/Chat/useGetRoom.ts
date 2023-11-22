import useGetData from "../useGetData";

interface GetRoomResponseType {
  room_id: string;
}

interface GetRoomRequestType {
  receiver: string;
}

const useGetRoom = () => {
  const { data, isLoading, error, fetchData } =
    useGetData<GetRoomResponseType>();

  const getRoom = (data: GetRoomRequestType) => {
    const query = Object.entries(data)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    fetchData(`/api/chat/room?${query}`);
  };
  return { data, isLoading, error, getRoom };
};

export default useGetRoom;
