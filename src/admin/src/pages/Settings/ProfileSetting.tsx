import ProfileCard from "../../components/ProfileCard";
import { useAuth } from "../../hooks/useAuth";
import ProfileInfoSettings from "../../partials/ProfileSettings/ProfileInfoSettings";
import ProfilePhoto from "../../partials/ProfileSettings/ProfilePhoto";

const ProfileSetting = () => {
  const { Auth } = useAuth();
  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 justify-center items-start gap-8 p-4 ">
        <ProfileCard
          username={Auth.username}
          role={Auth.role}
          deps={[Auth.accessToken]}
        />
        <div className="flex flex-col gap-8 place-self-center">
          <ProfilePhoto username={Auth.username} />
          <ProfileInfoSettings username={Auth.username} />
        </div>
      </main>
    </>
  );
};

export default ProfileSetting;
