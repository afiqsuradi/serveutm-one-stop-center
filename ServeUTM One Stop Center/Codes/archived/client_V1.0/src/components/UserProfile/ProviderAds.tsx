import {
  Card,
  CardBody,
  Stack,
  Image,
  Heading,
  Button,
} from "@chakra-ui/react";
import desk from "../../assets/desk.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/path";

const ProviderAds = () => {
  const navigate = useNavigate();
  return (
    <Card flex={2} align="center" textAlign="center">
      <CardBody>
        <Stack spacing={8} className="flex items-center">
          <Image marginX="auto" width="8em" src={desk} />
          <Heading as="h1" size="md" noOfLines={1}>
            Ready to own your own income?
          </Heading>
          <Button
            onClick={() => {
              navigate(ROUTES.PROVIDER_REGISTER);
            }}
            variant="base"
          >
            Become a seller
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProviderAds;
