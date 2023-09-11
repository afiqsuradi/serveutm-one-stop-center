import {
  Flex,
  Grid,
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

const UserStatistic = () => {
  return (
    <Grid
      templateColumns={{
        lg: "repeat(5, 1fr)",
        md: "repeat(3,1fr)",
        base: "1fr",
      }}
      gap={"2rem"}
      justifyContent={"center"}
      justifyItems={"center"}
      paddingX={{ lg: "10%", base: "1rem" }}
      paddingY={"2rem"}
    >
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

export default UserStatistic;
