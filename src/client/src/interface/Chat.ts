import { UserInfo } from "./User";
const chatMessageType = ["message", "image", "order"] as const;
export type RoomParticipantType = {
  user: {
    _id: string;
    username: UserInfo["username"];
    name: UserInfo["name"];
    profileImage: UserInfo["profileImage"];
  };
};

export type RoomMessageType = {
  type: (typeof chatMessageType)[number];
  sender: string;
  message: string;
  timestamp: string;
};

export type RoomType = {
  room_id: string;
  createdAt: string;
  participants: RoomParticipantType[];
  messages: RoomMessageType[];
};
