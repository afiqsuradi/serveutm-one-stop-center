import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel, MdRateReview } from "react-icons/md";
import { RiLoader4Line } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";

const SellerStatistic = () => {
  return (
    <Grid
      templateColumns={{
        lg: "repeat(5, 1fr)",
        base: "1fr",
      }}
      gap={"2rem"}
      justifyContent={"center"}
      justifyItems={"center"}
      paddingX={{ lg: "10%", base: "1rem" }}
      paddingY={"2rem"}
    >
      <GridItem colSpan={2} rowSpan={2} minW={"full"}>
        <Card minH={"full"}>
          <CardBody>
            <Box maxW={"max-content"} paddingBottom={"2"}>
              <Heading as={"h3"} fontSize={"lg"} fontWeight={"medium"}>
                Total Earning
              </Heading>
              <Divider />
            </Box>
            <Heading as={"h1"} fontSize={"3rem"}>
              RM 00.00
            </Heading>
          </CardBody>
        </Card>
      </GridItem>
      <Flex
        backgroundColor={"gray.700"}
        padding={"6"}
        direction={"row"}
        justifyContent="center"
        alignItems="end"
        gap="2rem"
        minW={"full"}
      >
        <Stat>
          <StatNumber>0/5</StatNumber>
          <StatLabel>Reputation</StatLabel>
        </Stat>
        <Icon as={AiFillStar as IconType} boxSize={10} />
      </Flex>
      <Flex
        backgroundColor={"gray.700"}
        padding={"6"}
        direction={"row"}
        justifyContent="center"
        alignItems="end"
        gap="2rem"
        minW={"full"}
      >
        <Stat>
          <StatNumber>0</StatNumber>
          <StatLabel>Reviews</StatLabel>
        </Stat>
        <Icon as={MdRateReview as IconType} boxSize={10} />
      </Flex>
      <Flex
        backgroundColor={"gray.700"}
        padding={"6"}
        direction={"row"}
        justifyContent="center"
        alignItems="end"
        gap="2rem"
        minW={"full"}
      >
        <Stat>
          <StatNumber>0</StatNumber>
          <StatLabel>Ongoing Orders</StatLabel>
        </Stat>
        <Icon as={RiLoader4Line as IconType} boxSize={10} />
      </Flex>
      <Flex
        backgroundColor={"gray.700"}
        padding={"6"}
        direction={"row"}
        justifyContent="center"
        alignItems="end"
        gap="2rem"
        minW={"full"}
      >
        <Stat>
          <StatNumber>0</StatNumber>
          <StatLabel>Orders</StatLabel>
        </Stat>
        <Icon as={BiSolidShoppingBagAlt as IconType} boxSize={10} />
      </Flex>
      <Flex
        backgroundColor={"gray.700"}
        padding={"6"}
        direction={"row"}
        justifyContent="center"
        alignItems="end"
        gap="2rem"
        minW={"full"}
      >
        <Stat>
          <StatNumber>0</StatNumber>
          <StatLabel>Completed</StatLabel>
        </Stat>
        <Icon as={BsCheckCircleFill as IconType} boxSize={10} />
      </Flex>
      <Flex
        backgroundColor={"gray.700"}
        padding={"6"}
        direction={"row"}
        justifyContent="center"
        alignItems="end"
        gap="2rem"
        minW={"full"}
      >
        <Stat>
          <StatNumber>0</StatNumber>
          <StatLabel>Cancelled</StatLabel>
        </Stat>
        <Icon as={MdCancel as IconType} boxSize={10} />
      </Flex>
    </Grid>
  );
};

export default SellerStatistic;
