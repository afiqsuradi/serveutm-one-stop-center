import { Flex } from "@chakra-ui/react";
import AvatarSetting from "../components/UserSettings/AvatarSetting";
import ProfileSetting from "../components/UserSettings/ProfileSetting";
import ChangePasswordModal from "../components/UserSettings/ChangePasswordModal";
import useUser from "../hooks/useUser";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const UserSetting = () => {
  const { Auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useUser(Auth.username);
  return (
    <>
      <Flex
        minHeight="80%"
        paddingX="6"
        paddingY="10"
        gap="6"
        justifyContent="center"
        alignContent="center"
        flexDirection={{ base: "column", md: "row" }}
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <AvatarSetting info={data} />
        <ProfileSetting info={data} isOpen={isOpen} setIsOpen={setIsOpen} />
      </Flex>
      <ChangePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default UserSetting;
