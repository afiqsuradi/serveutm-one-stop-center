import ProviderInfo from "@/components/Service_Provider/Profile/ProviderInfo";
import ProviderInfoSetting from "@/components/Service_Provider/Setting/ProviderInfoSetting";
import { useAuth } from "@/hooks/Auth/useAuth";
import useGetProvider from "@/hooks/Service_Provider/useGetProvider";

const ProfileSetting = () => {
  const { Auth } = useAuth();
  const { data } = useGetProvider(Auth.username);
  if (!data) return;
  return (
    <div className="flex justify-between md:flex-col lg:flex-row flex-wrap gap-12">
      <ProviderInfo username={Auth.username} />
      <ProviderInfoSetting initialValue={data} />
    </div>
  );
};

export default ProfileSetting;
