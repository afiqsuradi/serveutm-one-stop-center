import { useAuth } from "@/hooks/Auth/useAuth";
import { Button } from "../ui/button";
import useGetRoom from "@/hooks/Chat/useGetRoom";
import Spinner from "../ui/spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/constant/routes";
interface Props {
  receiver: string;
}
const ContactBtn = ({ receiver }: Props) => {
  const navigate = useNavigate();
  const { Auth } = useAuth();
  const { data, isLoading, getRoom } = useGetRoom();

  useEffect(() => {
    if (data) {
      navigate(`${ROUTES.CHAT}?id=${data.room_id}`);
    }
  }, [data]);
  return (
    <Button
      variant={"default"}
      className="w-full"
      disabled={
        Auth.accessToken.length === 0 || receiver.length === 0 || isLoading
      }
      onClick={() => getRoom({ receiver })}
    >
      {isLoading ? <Spinner /> : "Contact Me"}
    </Button>
  );
};

export default ContactBtn;
