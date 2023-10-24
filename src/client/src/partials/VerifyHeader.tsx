import useRequestVerifyEmail from "@/hooks/User/useRequestVerifyEmail";
import { IoMdAlert } from "react-icons/io";
const VerifyHeader = () => {
  const { requestToken, isLoading } = useRequestVerifyEmail();

  const onRequest = () => {
    if (isLoading) return;
    requestToken();
  };

  return (
    <div className=" bg-alert text-alert-foreground py-2">
      <div className="container flex justify-between">
        <h1 className="flex gap-2 items-center justify-start text-lg font-semibold">
          <span className="text-2xl">
            <IoMdAlert />
          </span>
          Seems your account is not verified,{" "}
          <span className="underline hover:cursor-pointer" onClick={onRequest}>
            verify now
          </span>
        </h1>
      </div>
    </div>
  );
};

export default VerifyHeader;
