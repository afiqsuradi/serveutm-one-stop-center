import { useParams } from "react-router-dom";
import ProfileCard from "../../../components/ProfileCard";
import ProfilePhoto from "../../../partials/ProfileSettings/ProfilePhoto";
import ProfileInfoSettings from "../../../partials/ProfileSettings/ProfileInfoSettings";
import { useAuth } from "../../../hooks/useAuth";

const EditUser = () => {
  const { Auth } = useAuth();
  const { username } = useParams();
  if (!username) return "";
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 justify-center items-start gap-8 p-4 ">
      <ProfileCard username={username} deps={[Auth.accessToken]} />
      <div className="flex flex-col gap-8 place-self-center">
        <ProfilePhoto username={username} />
        <ProfileInfoSettings username={username} />
      </div>
    </main>
  );
};

export default EditUser;
