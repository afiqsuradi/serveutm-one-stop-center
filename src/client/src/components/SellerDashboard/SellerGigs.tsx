import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  Heading,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";

const SellerGigs = () => {
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
                <Heading paddingBottom={3}>Gigs</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default SellerGigs;
