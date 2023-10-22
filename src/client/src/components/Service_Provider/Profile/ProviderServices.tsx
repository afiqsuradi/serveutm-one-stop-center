import useGetProvider from "@/hooks/Service_Provider/useGetProvider";
import { useAuth } from "@/hooks/Auth/useAuth";
import ServiceCard from "@/components/Gigs/ServiceCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/constant/routes";
import { Button } from "@/components/ui/button";

interface Props {
  username: string;
}

const ProviderServices = ({ username }: Props) => {
  const navigate = useNavigate();
  const { Auth } = useAuth();
  const { data, isLoading } = useGetProvider(username);
  if (!data || isLoading) {
    return;
  }
  if (!data.services) return;
  return (
    <div className="space-y-8">
      <div className="flex gap-6 items-center relative">
        <h1 className="text-xl font-semibold">
          {Auth.username === username ? "Your Gigs" : `${username}'s Gigs`}
        </h1>
        {Auth.username === username ? (
          <Button
            size={"sm"}
            className="absolute right-0 -top-1"
            onClick={() => navigate(ROUTES.PROVIDER_ADD)}
          >
            Add gigs
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-wrap gap-12">
        {data.services && data.services.length > 0 ? (
          data.services.map((service) => {
            return (
              <ServiceCard
                key={service._id}
                isOwner={Auth.username === username}
                service={service}
              />
            );
          })
        ) : Auth.username === username ? (
          <Card
            className="p-8 hover:cursor-pointer"
            onClick={() => navigate(ROUTES.PROVIDER_ADD)}
          >
            <CardHeader>
              <BsFillPlusCircleFill className="text-6xl w-full" />
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <h2>Create a new gig</h2>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProviderServices;
