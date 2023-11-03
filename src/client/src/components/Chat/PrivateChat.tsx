import useRoom from "@/hooks/Chat/useRoom";
import { Input } from "../ui/input";
import Spinner from "../ui/spinner";
import { useAuth } from "@/hooks/Auth/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MdSend } from "react-icons/md";
import useChat from "@/hooks/Chat/useChat";
import { useEffect, useRef, useState } from "react";
import { RoomMessageType, RoomMessageTypeWithOrder } from "@/interface/Chat";
import { useLocation, useNavigate } from "react-router-dom";
import ServiceImagesCarousel from "../Gigs/ServiceImagesCarousel";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import ROUTES from "@/constant/routes";
import { Button } from "../ui/button";
import useReject from "@/hooks/Orders/useReject";
import useDoneOrder from "@/hooks/Orders/useDoneOrder";

interface Props {
  room_id: string;
}

const PrivateChat = ({ room_id }: Props) => {
  const { reject, isLoading: rejectLoading } = useReject();
  const { markAsDone, isLoading: approveLoading } = useDoneOrder();

  const navigate = useNavigate();
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

  const onReject = (id: string) => {
    reject(id);
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
                  if (message.type === "order") {
                    const order = (message as RoomMessageTypeWithOrder).order;
                    return (
                      <div className="flex items-center  border p-4 my-4 gap-4">
                        <div className="w-[20rem]">
                          <ServiceImagesCarousel
                            showChild={false}
                            images={order.service.images}
                          />
                        </div>
                        <div className="space-y-2 w-full">
                          <div className="w-full flex gap-4">
                            <h3 className="font-semibold text-lg">
                              {order.service.title}
                            </h3>
                            <Badge
                              variant={
                                order.fullfillmentStatus === "Completed"
                                  ? "success"
                                  : order.fullfillmentStatus === "In Progress"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {order.fullfillmentStatus}
                            </Badge>
                          </div>
                          <div className="flex w-full gap-4 items-center">
                            <p className="text-foreground/75">
                              Ordered by{" "}
                              <span
                                className="text-foreground hover:underline hover:cursor-pointer"
                                onClick={() =>
                                  navigate(
                                    `${ROUTES.USER_PROFILE}?username=${order.user.username}`
                                  )
                                }
                              >
                                {order.user.username}
                              </span>
                            </p>
                            <Separator
                              orientation="vertical"
                              className="w-[1px] h-[20px]"
                            />
                            {order.placed && (
                              <p className="text-foreground/75">
                                Date ordered{" "}
                                <span className="text-foreground">
                                  {" "}
                                  {new Intl.DateTimeFormat("en-MY", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  }).format(new Date(order.placed))}
                                  ,{" "}
                                  {new Intl.DateTimeFormat("en-MY", {
                                    hour: "numeric",
                                    minute: "numeric",
                                  }).format(new Date(order.placed))}
                                </span>
                              </p>
                            )}
                          </div>
                          <div className=" border p-4 flex gap-4 flex-col">
                            <div className="flex gap-4">
                              <h1>{order.package.title}</h1>
                              <Separator
                                orientation="vertical"
                                className="w-[1px] h-[20px]"
                              />
                              <p>Qty {order.quantity}</p>
                              <Separator
                                orientation="vertical"
                                className="w-[1px] h-[20px]"
                              />
                              <p>RM{order.total}</p>
                            </div>
                            {order.requirements &&
                            order.requirements.length > 0 ? (
                              <p>
                                <span className="text-foreground/75 font-semibold">
                                  User Requirement:
                                </span>{" "}
                                {order.requirements ? order.requirements : ""}
                              </p>
                            ) : (
                              ""
                            )}
                            <div className="space-x-4">
                              {order.fullfillmentStatus === "In Progress" &&
                              order.user.username !== Auth.username ? (
                                <>
                                  <Button
                                    className="w-[9rem]"
                                    variant={"destructive"}
                                    onClick={() => onReject(order._id)}
                                    disabled={rejectLoading}
                                  >
                                    {rejectLoading ? (
                                      <Spinner />
                                    ) : (
                                      "Reject Request"
                                    )}
                                  </Button>
                                  <Button
                                    className="w-[9rem]"
                                    disabled={approveLoading}
                                    onClick={() => {
                                      markAsDone(order._id);
                                    }}
                                  >
                                    {approveLoading ? (
                                      <Spinner />
                                    ) : (
                                      "Mark As Done"
                                    )}
                                  </Button>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

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
