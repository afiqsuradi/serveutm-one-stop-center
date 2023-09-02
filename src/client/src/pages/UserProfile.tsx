import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BiSolidUser } from "react-icons/bi";
import useUser from "../hooks/useUser";

const UserProfile = () => {
  const { data } = useUser();
  return (
    <Flex gap={70} padding={70}>
      <Card maxW={"sm"} textAlign="center" flex={1}>
        <CardBody minW="90%">
          <Avatar
            size="2xl"
            name="Profile Picture"
            src={data?.profileImage}
            marginY={3}
          />
          <Stack spacing={1} marginY={3}>
            <Heading as="h1" size="lg" noOfLines={1}>
              {data?.name}
            </Heading>
            <Heading as="h2" size="md" noOfLines={1}>
              @{data?.username}
            </Heading>
          </Stack>
          <Divider />
        </CardBody>
        <CardFooter paddingTop="0" textAlign="start" paddingX={10}>
          <Box
            minW="full"
            className="flex flex-row justify-between items-center"
          >
            <Box className="flex flex-row items-center gap-3">
              <BiSolidUser />
              <Text>Member since</Text>
            </Box>
            <Text>{data?.dateJoined}</Text>
          </Box>
        </CardFooter>
      </Card>
      <Card flex={2} align="center" textAlign="center">
        <CardBody>
          <Stack spacing={8} className="flex items-center">
            <Image
              marginX="auto"
              width="8em"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.procore.com%2Fdam%2Fjcr%3Acbe201fb-d661-41c0-9b60-020662468e8a%2Ficon_desk_grey.png&f=1&nofb=1&ipt=a4b267ea872a1947fe13c09b3fc76950658314b095a54a6756410cf9b4829274&ipo=images"
            />
            <Heading as="h1" size="md" noOfLines={1}>
              Ready to own your own income?
            </Heading>
            <Button variant="base">Become a seller</Button>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserProfile;
