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
import afiq from "../../assets/afiq.png";
import aliff from "../../assets/aliff.jpg";
import danish from "../../assets/danish.jpg";
import hazeem from "../../assets/hazeem.jpg";
import irfan from "../../assets/irfan.png";
import naza from "../../assets/naza.jpg";
const teams = [
  {
    image: afiq,
    name: "Aiman Afiq",
    role: "Project Leader",
  },
  {
    image: irfan,
    name: "Irfan Afnan",
    role: "Documentation Leader",
  },
  {
    image: naza,
    name: "Nazarudeen",
    role: "Programmer",
  },
  {
    image: aliff,
    name: "Aliff Imran",
    role: "Documentation",
  },
  {
    image: hazeem,
    name: "Hazeem",
    role: "Documentation",
  },
  {
    image: danish,
    name: "Danish Danial",
    role: "Programmer",
  },
];

const TeamCard = () => {
  return (
    <Box
      className="bg-slate-100"
      minW={"full"}
      paddingX={"10%"}
      paddingY={"2rem"}
    >
      <Grid
        templateRows={{ base: "repeat(7, 1fr)", sm: "repeat(2, 1fr)" }}
        templateColumns={{ base: "1fr", sm: "repeat(4, 1fr)" }}
        gap={"2rem"}
        className="text-center"
      >
        <GridItem colSpan={{ base: 1, sm: 2 }}>
          <h1 className="text-gray-900 py-10 text-[4rem]">
            MEET OUR
            <br />
            TEAM
          </h1>
        </GridItem>
        {teams.map((team) => {
          return (
            <Flex
              paddingY={"5"}
              direction={"column"}
              justify={"center"}
              align={"center"}
              className="min-w-[15rem] relative bg-white m-auto  border-gray-200 rounded-2xl shadow-lg drop-shadow-xl"
            >
              <Image
                borderRadius={"full"}
                draggable={false}
                width={"10rem"}
                height={"10em"}
                fit={"cover"}
                src={team.image}
                alt={team.name}
                border="3px solid"
                borderColor="blue.500"
                className="shadow-lg drop-shadow-xl"
              />
              <VStack
                padding={"0.5rem"}
                width={"80%"}
                className="min-w-full text-gray-900"
              >
                <Heading as="h1" fontSize={"2xl"}>
                  {team.name}
                </Heading>
                <Text textAlign={"center"}>{team.role}</Text>
              </VStack>
            </Flex>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TeamCard;
