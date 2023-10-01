import useProfile from "../hooks/useProfile";
import { BiSolidUser } from "react-icons/bi";

const ProfileCard = ({
  username,
  role,
  deps,
}: {
  username: string;
  role?: string;
  deps?: any[];
}) => {
  const { response } = useProfile(username, deps);

  return (
    <div className="card w-96 bg-white dark:bg-[#1D283A] shadow-xl text-black dark:text-white max-h-[24rem] mx-auto">
      <figure className="relative">
        {role === "admin" ? (
          <div className="absolute right-2 top-2 badge badge-primary">
            Admin
          </div>
        ) : (
          ""
        )}
        <div className="bg-neutral-500 dark:bg-zinc-300 w-full h-32"></div>
      </figure>
      <div className="card-body relative pt-12 text-center z-0">
        <div className="absolute avatar  top-[-50%] translate-y-[70%] left-1/2 translate-x-[-50%] z-10">
          <div className="w-24 rounded-full">
            <img src={response?.profileImage} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-center font-bold text-3xl">{response?.name}</h2>
            <h3 className="text-xl">@{response?.username}</h3>
          </div>
          <div className="divider"></div>
          <div className="min-w-full inline-grid grid-cols-2 items-center text-center">
            <div className="flex flex-row gap-2 items-center">
              <BiSolidUser />
              <p className="text-start">Member since</p>
            </div>
            <p>{response?.dateJoinedFormatted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
