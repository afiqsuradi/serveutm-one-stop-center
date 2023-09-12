import { Container, Heading, Text, Box, Flex } from "@chakra-ui/react";
import TeamCard from "../components/About/TeamCard";

const AboutUs = () => {

  return (
    <Container
      maxW={"100%"}
      p={0}
      bg="rgb(233,245,248)"
      bgGradient="linear(to bottom, rgba(233,245,248,1) 0%, rgba(241,245,249,1) 68%)"
      color="#161616"
      paddingTop={50}
    >
      <Box className="App">
        <Flex className="content" p={8}>
          <Box
            flex="1"
            bg={"#1f2937"}
            mt={20}
            mr={10}
            padding={10}
            borderRadius="20"
            transform="rotate(355deg)"
            boxShadow = "rgb(38, 57, 77) 0px 20px 30px -10px"
            
          >
            <Flex>
              <Box 
              >
                <Heading
                  as="h1"
                  bg={"#fff"}
                  marginBottom={20}
                  mt={-10}
                  padding={"2"}
                  borderRadius="20"
                  transform="rotate(340deg)"
                  fontSize="4xl"
                  display="block"
                  fontFamily="Helvetica Neue,sans-serif"
                >
                  ServeUTM
                </Heading>
              </Box>
              <Box
                flex="1"
                bg={"#1f2937"}
                color={"#fff"}
                marginRight={50}
                marginLeft={-20}
                marginTop={70}
                borderRadius="20"
                transform="rotate(5deg)"
                fontFamily="Helvetica Neue,sans-serif"
                fontWeight={"semibold"}
               
              >
                <Text>
                  ServeUTM One Stop Center is a website created to help UTM
                  students facing financial challenges. It serves as a hub where
                  UTM students can offer their services, and others can find and
                  hire these services in one place.
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box
            flex="1"
            bg={"#fff"}
            mt={20}
            ml={10}
            padding={10}
            borderRadius="20"
            transform="rotate(5deg)"
            boxShadow = "rgb(38, 57, 77) 0px 20px 30px -10px"
            
          >
            <Flex>
              <Box
              >
                <Heading
                  as="h1"
                  bg={"#1f2937"}
                  color={"#fff"}
                  marginBottom={20}
                  padding={"2"}
                  mt={-10}
                  borderRadius="20"
                  transform="rotate(10deg)"
                  fontSize="4xl"
                  display="block"
                  fontFamily="Helvetica Neue,sans-serif"
                >
                  Our Vision
                </Heading>
              </Box>
              <Box
                flex="1"
                bg={"white"}
                color={"#1d2937"}
                marginRight={50}
                marginLeft={-20}
                marginTop={70}
                borderRadius="20"
                transform="rotate(-5deg)"
                fontFamily="Helvetica Neue,sans-serif"
                fontWeight={"semibold"}
                
              >
                <Text>
                  Our goal is to make a website that helps students make money
                  by selling things or doing deliveries. This website also helps
                  them with money and school, and they can connect with other
                  students to help each other learn.
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>

        <Flex id="team" className="team" p={8}>
          <Box flex="1"></Box>
        </Flex>
      </Box>
      <TeamCard />
    </Container>
  );
};

export default AboutUs;
