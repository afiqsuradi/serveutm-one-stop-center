import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AvatarSetting from "../components/UserSettings/AvatarSetting";
import ProfileSetting from "../components/UserSettings/ProfileSetting";
import ChangePasswordModal from "../components/UserSettings/ChangePasswordModal";
import useUser from "../hooks/useUser";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ServiceProfileSetting from "../components/UserSettings/ServiceProfileSetting";

const UserSetting = () => {
  const { Auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useUser(Auth.username);
  return (
    <>
      <Grid
        templateColumns={{ sm: "1fr 2fr", base: "1fr" }}
        paddingX={"5rem"}
        paddingY={"5rem"}
      >
        <AvatarSetting info={data} />
        <Card
          flex={2}
          justifyContent="center"
          alignItems="center"
          paddingX="8"
          maxWidth="65rem"
        >
          <Tabs size="md" variant="enclosed" minWidth="full">
            <CardHeader minWidth="full" paddingX="0">
              <TabList>
                <Tab>Edit Account</Tab>
                {Auth.role === "service_provider" ? (
                  <Tab>Edit Profile</Tab>
                ) : (
                  ""
                )}
              </TabList>
            </CardHeader>

            <CardBody paddingX="0" paddingY="8" minWidth="full">
              <TabPanels>
                <TabPanel>
                  <ProfileSetting
                    info={data}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                </TabPanel>
                <TabPanel>
                  <ServiceProfileSetting username={Auth.username} />
                </TabPanel>
              </TabPanels>
            </CardBody>
          </Tabs>
        </Card>
      </Grid>
      <ChangePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default UserSetting;
