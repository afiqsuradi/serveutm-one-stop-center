import { Card, CardBody, CardHeader, Heading, Tag } from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/path";

const ProviderGigs = () => {
  const navigate = useNavigate();
  return (
    <Card flex={2} align="center" textAlign="center">
      <CardHeader minW="100%" display="flex">
        <Tag size={"lg"} variant="solid" colorScheme="whatsapp">
          Active Gigs
        </Tag>
      </CardHeader>
      <CardBody minW="100%">
        <Card
          align="start"
          textAlign="center"
          minH="11em"
          maxW="max-content"
          variant="secondary"
          className="hover:cursor-pointer transition-all"
          _hover={{
            transform: "scale(1.1)",
          }}
          onClick={() => {
            navigate(ROUTES.PROVIDER_ADD);
          }}
        >
          <CardBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap={2}
          >
            <AiFillPlusCircle fontSize="5em" className="text-green-400" />
            <Heading as="h2" fontSize="md">
              Create a new gigs
            </Heading>
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
};

export default ProviderGigs;
