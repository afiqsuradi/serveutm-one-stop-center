import { Avatar, Box, Heading, Text } from "@chakra-ui/react";
import { OwnerType } from "../../../hooks/Services/useService";
import { useNavigate } from "react-router-dom";

interface Props {
  userdata: OwnerType;
}

const AboutOwner = ({ userdata: { profileImage, name, username } }: Props) => {
  const navigate = useNavigate();
  return (
    <Box
      className="border-2 border-gray-800 rounded-lg w-full flex flex-row items-center gap-6 p-4 hover:cursor-pointer hover:bg-[#641AE6]"
      onClick={() => {
        navigate(`/profile/${username}`);
      }}
    >
      <Avatar size="lg" name={name} src={profileImage} />
      <div className="flex gap-2 flex-col">
        <Heading fontSize={"xl"}>{name}</Heading>
        <Text>{username}</Text>
      </div>
    </Box>
  );
};

export default AboutOwner;
