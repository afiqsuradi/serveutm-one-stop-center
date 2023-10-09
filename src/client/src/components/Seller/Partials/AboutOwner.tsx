import { Avatar, Box, Heading, Text } from "@chakra-ui/react";
import { OwnerType } from "../../../pages/Seller/AddGig";

interface Props {
  userdata: OwnerType;
}

const AboutOwner = ({ userdata: { profileImage, name, username } }: Props) => {
  return (
    <Box className="border-2 border-gray-800 rounded-lg w-full flex flex-row items-center gap-6 p-4">
      <Avatar size="lg" name={name} src={profileImage} />
      <div className="flex gap-2 flex-col">
        <Heading fontSize={"xl"}>{name}</Heading>
        <Text>{username}</Text>
      </div>
    </Box>
  );
};

export default AboutOwner;
