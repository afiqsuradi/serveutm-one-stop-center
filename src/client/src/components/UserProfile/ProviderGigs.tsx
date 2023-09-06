import { Card, CardBody, CardHeader, Heading, Tag } from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";

const ProviderGigs = () => {
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
