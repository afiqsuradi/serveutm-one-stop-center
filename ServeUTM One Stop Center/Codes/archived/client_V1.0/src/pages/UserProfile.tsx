import { Grid, GridItem } from "@chakra-ui/react";
import ProviderAds from "../components/UserProfile/ProviderAds";
import ProfileCard from "../components/UserProfile/ProfileCard";
import { useAuth } from "../hooks/useAuth";
import ProviderGigs from "../components/UserProfile/ProviderGigs";
import ProviderInfo from "../components/UserProfile/ProviderInfo";
import useUserProfile from "../hooks/useUserProfile";

const UserProfile = () => {
  const { Auth } = useAuth();
  const { response } = useUserProfile(Auth.username, Auth.role);
  if (!response) return;
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
        <ProviderGigs servicesData={response.services} />
      )}
      {Auth.role === "service_provider" ? (
        <GridItem colStart={1}>
          <ProviderInfo UserData={response} />
        </GridItem>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default UserProfile;
