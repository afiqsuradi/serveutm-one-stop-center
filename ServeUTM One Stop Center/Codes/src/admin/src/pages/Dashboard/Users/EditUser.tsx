import { useParams } from "react-router-dom";
import ProfileCard from "../../../components/ProfileCard";
import ProfilePhoto from "../../../partials/ProfileSettings/ProfilePhoto";
import ProfileInfoSettings from "../../../partials/ProfileSettings/ProfileInfoSettings";
import { useAuth } from "../../../hooks/useAuth";
import EditServiceProviderSettings from "../../../components/Users/EditServiceProviderSettings";
import ServiceProvInfoCard from "../../../components/ServiceProvInfoCard";

const EditUser = () => {
  const { Auth } = useAuth();
  const { username } = useParams();
  if (!username) return "";
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 justify-center items-start gap-8 p-4 ">
      <div className="justify-self-center">
        <ProfileCard username={username} deps={[Auth.accessToken]} />
        <ServiceProvInfoCard username={username} deps={[Auth.accessToken]} />
      </div>
      <div className="flex flex-col gap-8 place-self-center self-start">
        <ProfilePhoto username={username} />
        <ProfileInfoSettings username={username} />
      </div>
      <div className="min-w-full sm:col-span-2">
        <EditServiceProviderSettings username={username} />
      </div>
    </main>
  );
};

export default EditUser;
