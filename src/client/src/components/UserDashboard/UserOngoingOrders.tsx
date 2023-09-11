import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/path";

const UserOngoingOrders = () => {
  return (
    <Container
      paddingX={{ lg: "10%", base: "0" }}
      margin={0}
      minW={"full"}
      paddingY={"2rem"}
    >
      <Card>
        <CardHeader>
          <Heading paddingBottom={3}>Ongoing Orders</Heading>
          <Divider />
        </CardHeader>
        <CardBody>
          <Box
            border="1px"
            borderStyle={"dashed"}
            borderWidth={"medium"}
            borderColor="green.300"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            padding={"2rem"}
            gap={"1rem"}
          >
            <Icon as={BsFillCartFill as IconType} boxSize={16} />
            <Text fontSize={"xl"}>There are no ongoing orders</Text>
            <Link to={ROUTES.HOMEPAGE} className="bg-[#9e47e5] p-3 rounded-lg">
              Order Now
            </Link>
          </Box>
        </CardBody>
      </Card>
    </Container>
  );
};

export default UserOngoingOrders;
