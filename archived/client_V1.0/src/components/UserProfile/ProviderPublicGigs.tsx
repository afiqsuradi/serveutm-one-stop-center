import { UserProfile } from "../../interface/ProviderInfo";
import { Card, CardBody, CardHeader, Tag } from "@chakra-ui/react";
import ServicePublicCard from "../ServicePublicCard";

interface Props {
  servicesData: UserProfile["services"];
}

const ProviderPublicGigs = ({ servicesData }: Props) => {
  return (
    <Card flex={2} align="center" textAlign="center">
      <CardHeader minW="100%" display="flex" className="justify-between">
        <Tag size={"lg"} variant="solid" colorScheme="whatsapp">
          Active Gigs
        </Tag>
      </CardHeader>
      <CardBody minW="100%" className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {servicesData
          ? servicesData.map((service) => (
              <ServicePublicCard serviceData={service} />
            ))
          : ""}
      </CardBody>
    </Card>
  );
};

export default ProviderPublicGigs;
