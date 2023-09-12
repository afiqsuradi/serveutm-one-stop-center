import styles from "./style.module.css";
import {
  Image,
  VStack,
  Box,
  Text,
  Heading,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import afiq from "../../../assets/afiq.png";
import aliff from "../../../assets/aliff.jpg";
import danish from "../../../assets/danish.jpg";
import hazeem from "../../../assets/hazeem.jpg";
import irfan from "../../../assets/irfan.png";
import naza from "../../../assets/naza.jpg";
const teams = [
  {
    image: afiq,
    name: "Aiman Afiq",
    role: "Project Leader",
    colStart: { md: 1, lg: 1, xl: 2, sm: 1 },
  },
  {
    image: irfan,
    name: "Irfan Afnan",
    role: "Documentation Leader",
    colStart: { md: 2, lg: 2, xl: 3, sm: 2 },
  },
  {
    image: naza,
    name: "Nazarudeen",
    role: "Programmer",
    colStart: { md: 1, lg: 3, xl: 1, sm: 1 },
  },
  {
    image: aliff,
    name: "Aliff Imran",
    role: "Documentation",
    colStart: { md: 2, lg: 1, xl: 2, sm: 1 },
  },
  {
    image: hazeem,
    name: "Hazeem",
    role: "Documentation",
    colStart: { md: 1, lg: 2, xl: 3, sm: 1 },
  },
  {
    image: danish,
    name: "Danish Danial",
    role: "Programmer",
    colStart: { md: 2, lg: 3, xl: 4, sm: 1 },
  },
];

const TeamCard = () => {
  return (
    <>
      <Box
        className="bg-slate-200 flex flex-col items-center justify-center"
        minW={"full"}
        paddingX={"10%"}
        paddingY={"3rem"}
        paddingBottom={"5rem"}
      >
        {
          <h1 className="meet-our-team text-gray-900 py-10 text-[4rem] font-bold tracking-wide opacity-80">
            Meet Our Team
          </h1>
        }

        <Grid
          templateRows={{ base: "repeat(7, 1fr)", sm: "repeat(2, 1fr)" }}
          templateColumns={{ base: "1fr", sm: "repeat(4, 1fr)" }}
          gap={"2rem"}
          className="text-center"
        >
          {teams.map((team) => {
            return (
              <GridItem colStart={team.colStart}>
                <Flex
                  paddingY={"5"}
                  direction={"column"}
                  justify={"center"}
                  align={"center"}
                  className="min-w-[15rem] h-80 relative bg-white m-auto  border-gray-200 shadow-lg drop-shadow-xl"
                >
                  <Image
                    borderRadius={"full"}
                    draggable={false}
                    width={"8rem"}
                    height={"8em"}
                    fit={"cover"}
                    src={team.image}
                    alt={team.name}
                    /* border="3px solid"
                borderColor="none" */
                    className="shadow-lg drop-shadow-xl"
                  />
                  <VStack
                    padding={"0.5rem"}
                    width={"80%"}
                    className="min-w-full text-gray-900"
                  >
                    <Heading
                      as="h1"
                      fontSize={"2xl"}
                      fontFamily={"Poppins"}
                      className="pt-10"
                    >
                      {team.name}
                    </Heading>
                    <Text textAlign={"center"}>{team.role}</Text>
                  </VStack>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default TeamCard;
