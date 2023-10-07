import { Card, CardBody, CardHeader, Tag } from "@chakra-ui/react";
import ServiceCard from "../Seller/ServiceCard";
import AddServiceCard from "../Seller/AddServiceCard";
import { UserProfile } from "../../interface/ProviderInfo";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/path";

interface Props {
  servicesData: UserProfile["services"];
}

const ProviderGigs = ({ servicesData }: Props) => {
  const navigate = useNavigate();
  return (
    <Card flex={2} align="center" textAlign="center">
      <CardHeader minW="100%" display="flex" className="justify-between">
        <Tag size={"lg"} variant="solid" colorScheme="whatsapp">
          Active Gigs
        </Tag>
        <Tag
          size={"lg"}
          variant="solid"
          backgroundColor={"green.500"}
          _hover={{ backgroundColor: "green.700" }}
          color={"white"}
          className="hover:cursor-pointer hover:scale-[1.1]"
          onClick={() => {
            navigate(ROUTES.PROVIDER_ADD);
          }}
        >
          Add New
        </Tag>
      </CardHeader>
      <CardBody minW="100%" className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {servicesData
          ? servicesData.map((service) => <ServiceCard serviceData={service} />)
          : ""}
        {servicesData ? "" : <AddServiceCard />}
      </CardBody>
    </Card>
  );
};

export default ProviderGigs;
