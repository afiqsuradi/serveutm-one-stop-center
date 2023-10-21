import useGetProvider from "@/hooks/Service_Provider/useGetProvider";
import { useAuth } from "@/hooks/Auth/useAuth";
import ServiceCard from "@/components/Gigs/ServiceCard";

interface Props {
  username: string;
}

const ProviderServices = ({ username }: Props) => {
  const { Auth } = useAuth();
  const { data, isLoading } = useGetProvider(username);
  if (!data || isLoading) {
    return;
  }
  if (!data.services) return;
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold">
        {Auth.username === username ? "Your Gigs" : `${username}'s Gigs`}
      </h1>
      <div className="flex flex-wrap gap-12">
        {data.services &&
          data.services.map((service) => {
            return (
              <ServiceCard
                key={service._id}
                isOwner={Auth.username === username}
                service={service}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProviderServices;
