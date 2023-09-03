import { Grid } from "@chakra-ui/react";
import ProviderAds from "../components/UserProfile/ProviderAds";
import ProfileCard from "../components/UserProfile/ProfileCard";

const UserProfile = () => {
  return (
    <Grid
      templateColumns={{ sm: "1fr 3fr", base: "1fr" }}
      gap={50}
      padding={50}
    >
      <ProfileCard />
      <ProviderAds />
    </Grid>
  );
};

export default UserProfile;
