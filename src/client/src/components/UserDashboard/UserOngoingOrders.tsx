import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
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
      <Accordion backgroundColor={"gray.700"} borderRadius={"lg"} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading paddingBottom={3}>Ongoing Orders</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
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
              <Link
                to={ROUTES.HOMEPAGE}
                className="bg-[#9e47e5] p-3 rounded-lg"
              >
                Order Now
              </Link>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default UserOngoingOrders;
