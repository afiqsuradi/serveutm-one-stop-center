import { Grid, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProfileCard from "../components/UserProfile/ProfileCard";
import useUser, { UserInfo } from "../hooks/useUser";
import useUserProfile from "../hooks/useUserProfile";
import ProviderInfo from "../components/UserProfile/ProviderInfo";
import { useEffect, useState } from "react";
import ProviderPublicGigs from "../components/UserProfile/ProviderPublicGigs";

const UserPublicProfile = () => {
  const [userData, setUserData] = useState<UserInfo>({
    profileImage: "",
    name: "",
    username: "",
    email: "",
    dateJoined: "",
  });
  const { username } = useParams();
  const { data } = useUser(username ? username : "");
  const { response } = useUserProfile(userData?.username, userData?.role);
  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  if (!username || !data || !response) return;
  return (
    <Grid
      templateColumns={{ sm: "1fr 3fr", base: "1fr" }}
      gap={50}
      padding={50}
    >
      <ProfileCard username={username} />
      {data.role === "user" ? (
        ""
      ) : (
        <ProviderPublicGigs servicesData={response.services} />
      )}
      {data.role === "service_provider" ? (
        <GridItem colStart={1}>
          <ProviderInfo UserData={response} />
        </GridItem>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default UserPublicProfile;
