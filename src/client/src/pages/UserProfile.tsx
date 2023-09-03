import { Grid } from "@chakra-ui/react";
import ProviderAds from "../components/UserProfile/ProviderAds";
import ProfileCard from "../components/UserProfile/ProfileCard";
import { useAuth } from "../hooks/useAuth";

const UserProfile = () => {
  const { Auth } = useAuth();
  return (
    <Grid
      templateColumns={{ sm: "1fr 3fr", base: "1fr" }}
      gap={50}
      padding={50}
    >
      <ProfileCard username={Auth.username} />
      {Auth.role === "user" ? <ProviderAds /> : ""}
    </Grid>
  );
};

export default UserProfile;
