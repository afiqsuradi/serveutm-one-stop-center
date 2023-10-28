import mascot from "@/assets/groupchat-mascot.svg";
import { Input } from "@/components/ui/input";
import useSocket from "@/hooks/Chat/useSocket";
import { useRef, useState } from "react";

const TextChat = () => {
  const messageEl = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string[]>([]);
  const { socket } = useSocket();
  if (socket) {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("message", (data) => {
      setMessage([...message, data]);
    });
  }

  const onSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (messageEl.current && socket) {
      socket.emit("message", messageEl.current.value);
    }
  };

  return (
    <div className="container grid grid-cols-[1fr_2fr] gap-2 justify-between my-12">
      <section>s</section>
      <section>
        <form onSubmit={onSumbit}>
          <Input ref={messageEl} type="text" placeholder="Type here" />
        </form>
        {message.map((msg) => {
          return <div>{msg}</div>;
        })}
      </section>
      {/* <section className="border rounded-lg flex flex-col justify-center items-center py-6">
        <img src={mascot} className="w-[25rem]" />
        <h1 className="font-semibold text-xl text-foreground/75">
          Pick where you left off
        </h1>
        <p className="text-foreground/60">
          Select a conversation and chat away.
        </p>
      </section> */}
    </div>
  );
};

export default TextChat;
