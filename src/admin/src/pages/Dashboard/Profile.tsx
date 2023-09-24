import { useAuth } from "../../hooks/useAuth";
import ProfileCard from "../../components/ProfileCard";
const Profile = () => {
  const { Auth } = useAuth();
  return (
    <main className="p-20">
      <ProfileCard username={Auth.username} role={Auth.role} />
    </main>
  );
};

export default Profile;
