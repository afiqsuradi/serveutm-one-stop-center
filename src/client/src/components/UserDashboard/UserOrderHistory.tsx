import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";

const UserOrderHistory = () => {
  return (
    <Container
      paddingX={{ lg: "10%", base: "0" }}
      margin={0}
      minW={"full"}
      paddingY={"2rem"}
    >
      <Accordion backgroundColor={"gray.700"} borderRadius={"lg"} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading paddingBottom={3}>Orders History</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
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
              <Text fontSize={"xl"}>You haven't place an order</Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default UserOrderHistory;
