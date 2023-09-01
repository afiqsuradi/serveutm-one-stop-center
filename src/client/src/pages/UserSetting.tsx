import { Flex } from "@chakra-ui/react";
import { SetStateAction, useRef, useState } from "react";
import AvatarSetting from "../components/UserSettings/AvatarSetting";
import ProfileSetting from "../components/UserSettings/ProfileSetting";
import ChangePasswordModal from "../components/UserSettings/ChangePasswordModal";

const UserSetting = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Flex
        minHeight="full"
        paddingX="6"
        paddingY="10"
        gap="6"
        justifyContent="center"
        alignContent="center"
        flexDirection={{ base: "column", md: "row" }}
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <AvatarSetting />
        <ProfileSetting isOpen={isOpen} setIsOpen={setIsOpen} />
      </Flex>
      <ChangePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default UserSetting;
