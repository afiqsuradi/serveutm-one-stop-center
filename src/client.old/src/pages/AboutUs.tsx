import { Container } from "@chakra-ui/react";
import TeamCard from "../components/About/TeamCard";
import Introduction from "../components/About/Introduction";
import Vision from "../components/About/Vision";

const AboutUs = () => {
  return (
    <Container maxW={"100%"} padding={"0"}>
      <Introduction />
      <Vision />
      <TeamCard />
    </Container>
  );
};

export default AboutUs;
