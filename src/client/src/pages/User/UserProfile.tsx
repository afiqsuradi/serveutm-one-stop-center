import AvatarCard from "@/components/User/Profile/AvatarCard";
import BecomeSellerBanner from "@/components/User/Profile/BecomeSellerBanner";
import { useAuth } from "@/hooks/Auth/useAuth";
import useGetUser from "@/hooks/User/useGetUser";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const { Auth } = useAuth();
  const username =
    new URLSearchParams(location.search).get("username") ?? Auth.username;
  const { data } = useGetUser(username);
  if (!data) {
    return;
  }
  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center md:flex-row md:gap-12 mt-16 gap-8">
        <section className="w-full md:w-fit">
          <AvatarCard userData={data} />
        </section>
        <section className="w-full">
          {data.role === "user" && Auth.username === data.username ? (
            <BecomeSellerBanner />
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
