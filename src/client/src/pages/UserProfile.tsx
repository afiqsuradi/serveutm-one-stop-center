import { Grid, GridItem } from "@chakra-ui/react";
import ProviderAds from "../components/UserProfile/ProviderAds";
import ProfileCard from "../components/UserProfile/ProfileCard";
import { useAuth } from "../hooks/useAuth";
import ProviderGigs from "../components/UserProfile/ProviderGigs";
import ProviderInfo from "../components/UserProfile/ProviderInfo";

const UserProfile = () => {
  const { Auth } = useAuth();
  return (
    <Grid
      templateColumns={{ sm: "1fr 3fr", base: "1fr" }}
      gap={50}
      padding={50}
    >
      <ProfileCard username={Auth.username} />
      {Auth.role === "user" ? <ProviderAds /> : <ProviderGigs />}
      {Auth.role === "service_provider" ? (
        <GridItem colStart={1}>
          <ProviderInfo username={Auth.username} />
        </GridItem>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default UserProfile;
