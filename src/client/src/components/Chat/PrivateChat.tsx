import useRoom from "@/hooks/Chat/useRoom";
import { Input } from "../ui/input";
import Spinner from "../ui/spinner";
import { useAuth } from "@/hooks/Auth/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MdSend } from "react-icons/md";
import useChat from "@/hooks/Chat/useChat";
import { useEffect, useRef, useState } from "react";
import { RoomMessageType } from "@/interface/Chat";
import { useLocation } from "react-router-dom";

interface Props {
  room_id: string;
}

const PrivateChat = ({ room_id }: Props) => {
  const location = useLocation();
  const [previousRoom, setPreviousRoom] = useState("");
  const textInput = useRef<HTMLInputElement>(null);
  const [typingUser, setTypingUser] = useState("");
  const { socket } = useChat();
  const { Auth } = useAuth();
  const { data, isLoading } = useRoom(room_id);
  const [messages, setMessages] = useState<RoomMessageType[] | null>(
    data ? data.messages : null
  );

  const onTypeChange = () => {
    if (socket) {
      socket.emit("activity", {
        room_id,
        username: Auth.username,
      });
    }
  };

  const onSendText = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket && textInput.current && textInput.current.value.length > 0) {
      socket.emit("message", {
        header: {
          room_id,
          sender: Auth.username,
        },
        data: {
          message: textInput.current.value,
          type: "message",
        },
      });
      textInput.current.value = "";
    }
  };

  useEffect(() => {
    const room = room_id;
    if (socket && room_id.length > 0 && room !== previousRoom) {
      console.log("join");
      socket.emit("join", {
        room_id: room,
        user: Auth.username,
      });
      socket.on("activity", (data) => {
        setTypingUser(data);
      });
      socket.on("message", (data) => {
        setMessages((prev) => {
          if (prev) {
            return [...prev, data];
          }
          return [data];
        });
      });
    }
    return function () {
      if (socket && room_id.length > 0 && room !== previousRoom) {
        setPreviousRoom(() => room);
        socket.off("activity");
        socket.off("message");
      }
    };
  }, [socket, room_id, location.search]);

  useEffect(() => {
    const id = setTimeout(() => {
      setTypingUser("");
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  }, [typingUser]);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    if (previousRoom.length > 0 && socket) {
      socket.emit("leave", previousRoom);
    }
  }, [previousRoom, socket]);

  if (!data) return;
  return (
    <section className="border rounded-lg w-full flex flex-col min-h-[35rem]">
      {isLoading ? (
        <div className="mx-auto my-auto">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="border-b p-6">
            {data.participants.map((participator) => {
              if (participator.user.username === Auth.username) return;
              return (
                <div
                  className="flex items-center gap-1"
                  key={participator.user.username}
                >
                  <h5 className="text-lg text-foreground/75 font-semibold  max-w-full ">
                    {participator.user.name}
                  </h5>
                </div>
              );
            })}
          </div>
          <div className="p-6 w-full h-full max-h-[40rem] overflow-y-scroll flex flex-col">
            {messages
              ? messages.map((message) => {
                  const sender = data.participants.find((participator) => {
                    return participator.user._id === message.sender;
                  });
                  return (
                    <div key={message.timestamp} className="flex gap-2 py-4">
                      <Avatar className="w-[2rem] h-[2rem]">
                        <AvatarImage
                          src={sender?.user.profileImage}
                          className="object-cover"
                        />
                        <AvatarFallback>DP</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-foreground/75">
                          <span className="mr-2 font-semibold text-foreground">
                            {sender?.user.username === Auth.username
                              ? "Me"
                              : sender?.user.username}
                          </span>
                          {new Intl.DateTimeFormat("en-MY", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }).format(new Date(message.timestamp))}{" "}
                          <span>
                            (
                            {new Intl.DateTimeFormat("en-MY", {
                              hour: "numeric",
                              minute: "numeric",
                            }).format(new Date(message.timestamp))}
                            )
                          </span>
                        </p>
                        <p>{message.message}</p>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          <form
            className="flex flex-col w-full p-6 mt-auto"
            onSubmit={onSendText}
          >
            <div className="bg-secondary rounded-lg">
              {typingUser.length > 0 ? (
                <div className="p-2 ">
                  <p className="text-xs">{typingUser} is typing..</p>
                </div>
              ) : (
                ""
              )}
              <div className="relative w-full">
                <Input type="text" onChange={onTypeChange} ref={textInput} />
                <button
                  type="submit"
                  className="absolute top-1/2 -translate-y-1/2 right-4"
                >
                  <MdSend className="text-primary text-2xl hover:cursor-pointer transition-all hover:text-primary/75" />
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default PrivateChat;
