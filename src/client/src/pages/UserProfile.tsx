import { Grid, GridItem } from "@chakra-ui/react";
import ProviderAds from "../components/UserProfile/ProviderAds";
import ProfileCard from "../components/UserProfile/ProfileCard";
import { useAuth } from "../hooks/useAuth";
import ProviderGigs from "../components/UserProfile/ProviderGigs";
import ProviderInfo from "../components/UserProfile/ProviderInfo";
import useUserProfile from "../hooks/useUserProfile";

const UserProfile = () => {
  const { Auth } = useAuth();
  const { data } = useUserProfile(Auth.username, Auth.role);
  return (
    <Grid
      templateColumns={{ sm: "1fr 3fr", base: "1fr" }}
      gap={50}
      padding={50}
    >
      <ProfileCard username={Auth.username} />
      {Auth.role === "user" ? (
        <ProviderAds />
      ) : (
        <ProviderGigs servicesData={data.services} />
      )}
      {Auth.role === "service_provider" ? (
        <GridItem colStart={1}>
          <ProviderInfo UserData={data} />
        </GridItem>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default UserProfile;
