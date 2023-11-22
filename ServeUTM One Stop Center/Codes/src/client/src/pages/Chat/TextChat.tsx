import mascot from "@/assets/groupchat-mascot.svg";
import PrivateChat from "@/components/Chat/PrivateChat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import ROUTES from "@/constant/routes";
import { useAuth } from "@/hooks/Auth/useAuth";
import useRooms from "@/hooks/Chat/useRooms";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TextChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRoom, setSelectedRoom] = useState(
    new URLSearchParams(location.search).get("id") || ""
  );
  const { Auth } = useAuth();
  const { data, isLoading } = useRooms();

  const onSelectRoom = (room_id: string) => {
    if (room_id === selectedRoom) {
      navigate(ROUTES.CHAT);
    } else {
      navigate(`${ROUTES.CHAT}?id=${room_id}`);
    }
  };

  useEffect(() => {
    const id = new URLSearchParams(location.search).get("id") || "";
    setSelectedRoom(id);
  }, [location.search]);

  if (isLoading) return <Spinner />;
  return (
    <div className="container flex gap-4 justify-start my-12">
      <section>
        {data &&
          data.data.map((room) => {
            const receiver = room.participants.filter(
              (participator) => participator.user.username !== Auth.username
            )[0];
            return (
              <div
                key={room.room_id}
                className={`flex items-center rounded-lg p-4 w-full md:w-[15rem] hover:bg-secondary/20 hover:cursor-pointer ${
                  selectedRoom === room.room_id ? "bg-secondary/20" : ""
                }`}
                onClick={() => onSelectRoom(room.room_id)}
              >
                <Avatar className="w-[3rem] h-[3rem]">
                  <AvatarImage
                    src={receiver.user.profileImage}
                    className="object-cover"
                  />
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
                <Separator orientation="vertical" className="mx-2 h-[3rem]" />
                <div className="flex flex-col justify-center text-ellipsis overflow-hidden break-all">
                  <h5 className="text-sm text-foreground/75 font-semibold  max-w-full ">
                    {receiver.user.name}
                  </h5>
                  <p className="text-xs">@{receiver.user.username}</p>
                </div>
              </div>
            );
          })}
      </section>
      {selectedRoom.length > 0 ? (
        <PrivateChat room_id={selectedRoom} />
      ) : (
        <section className="border rounded-lg flex flex-col justify-center items-center py-6 w-full">
          <img src={mascot} className="w-[25rem]" />
          <h1 className="font-semibold text-xl text-foreground/75">
            Pick where you left off
          </h1>
          <p className="text-foreground/60">
            Select a conversation and chat away.
          </p>
        </section>
      )}
    </div>
  );
};

export default TextChat;
