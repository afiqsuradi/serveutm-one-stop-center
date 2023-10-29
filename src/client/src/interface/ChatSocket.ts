type DataHeader = {
  room_id: string;
  sender: string;
};

type Data<T> = {
  header: DataHeader;
  data: T;
};

type ActivityEventType = {
  room_id: string;
  username: string;
};

export interface ServerToClientEvents<T> {
  message: (data: T) => void;
  activity: (data: ActivityEventType["username"]) => void;
}

export interface ClientToServerEvents<T> {
  message: (data: Data<T>) => void;
  activity: (data: ActivityEventType) => void;
  join: ({ room_id, user }: { room_id: string; user: string }) => void;
  leave: (id: string) => void;
}
