import ProviderInfo from "@/components/Service_Provider/Profile/ProviderInfo";
import ProviderServices from "@/components/Service_Provider/Profile/ProviderServices";
import AvatarCard from "@/components/User/Profile/AvatarCard";
import BecomeSellerBanner from "@/components/User/Profile/BecomeSellerBanner";
import ROUTES from "@/constant/routes";
import { useAuth } from "@/hooks/Auth/useAuth";
import useGetUser from "@/hooks/User/useGetUser";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Auth } = useAuth();
  const username =
    new URLSearchParams(location.search).get("username") ?? Auth.username;
  const { data } = useGetUser(username);
  if (!data) {
    return;
  }
  if (!(Auth.username.length > 0) && !(username.length > 0)) {
    navigate(ROUTES.LOGIN);
  }
  return (
    <div className="container">
      <div className="flex flex-col justify-center items-start md:flex-row md:gap-12 my-16 gap-8">
        <section className="w-full md:w-fit space-y-12">
          <AvatarCard userData={data} />
          {data.role === "service_provider" ? (
            <ProviderInfo username={data.username} />
          ) : (
            ""
          )}
        </section>
        <section className="w-full self-start space-y-6">
          {data.role === "user" && Auth.username === data.username ? (
            <>
              <BecomeSellerBanner />
            </>
          ) : data.role === "service_provider" ? (
            <ProviderServices username={data.username} />
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
