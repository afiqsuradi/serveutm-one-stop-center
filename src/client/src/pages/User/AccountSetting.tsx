import AccountSettingForm from "@/components/User/Setting/AccountSettingForm";
import AvatarSetting from "@/components/User/Setting/AvatarSetting";
import AvatarCard from "@/components/User/Profile/AvatarCard";
import { useAuth } from "@/hooks/Auth/useAuth";
import useGetUser from "@/hooks/User/useGetUser";

const AccountSetting = () => {
  const { Auth } = useAuth();
  const { data } = useGetUser(Auth.username);
  if (!data) return;
  return (
    <div className="flex justify-between flex-wrap gap-12">
      <AvatarCard userData={data} />
      <div className="space-y-6">
        <AvatarSetting profileImage={Auth.profileImage} />
        <AccountSettingForm />
      </div>
    </div>
  );
};

export default AccountSetting;
