import { AiFillPlusCircle } from "react-icons/ai";
import ROUTES from "../../constants/path";
import { Card, CardBody, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddServiceCard = () => {
  const navigate = useNavigate();
  return (
    <Card
      align="start"
      textAlign="center"
      variant="secondary"
      className="hover:cursor-pointer transition-all max-w-[15rem]"
      _hover={{
        transform: "scale(1.05)",
      }}
      onClick={() => {
        navigate(ROUTES.PROVIDER_ADD);
      }}
    >
      <CardBody
        display="flex"
        minW="full"
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
  );
};

export default AddServiceCard;
