import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AvatarSetting from "../components/UserSettings/AvatarSetting";
import ProfileSetting from "../components/UserSettings/ProfileSetting";
import ChangePasswordModal from "../components/UserSettings/ChangePasswordModal";
import { useAuth } from "../hooks/useAuth";
import apiClient from "../services/apiClient";

export interface UserInfo {
  name: string;
  username: string;
  email: string;
  dateJoined: string;
}

const UserSetting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { Auth } = useAuth();
  const [info, setInfo] = useState<UserInfo>();

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<UserInfo>(`api/user/${Auth.username}`, {
        signal: controller.signal,
        withCredentials: true,
      })
      .then((res) => {
        const date = new Date(res.data.dateJoined);
        res.data.dateJoined = new Intl.DateTimeFormat("en-MY", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(date);
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  }, [Auth.username, Auth.accessToken]);
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
        <AvatarSetting info={info} />
        <ProfileSetting info={info} isOpen={isOpen} setIsOpen={setIsOpen} />
      </Flex>
      <ChangePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default UserSetting;
