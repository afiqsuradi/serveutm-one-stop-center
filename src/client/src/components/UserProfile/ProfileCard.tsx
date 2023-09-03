import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BiSolidUser } from "react-icons/bi";
import useUser from "../../hooks/useUser";
interface Props {
  username: string;
}
const ProfileCard = ({ username }: Props) => {
  const { data } = useUser(username);
  return (
    <Card maxW={"full"} textAlign="center" flex={1}>
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
        <Box minW="full" className="flex flex-row justify-between items-center">
          <Box className="flex flex-row items-center gap-3">
            <BiSolidUser />
            <Text>Member since</Text>
          </Box>
          <Text>{data?.dateJoined}</Text>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
