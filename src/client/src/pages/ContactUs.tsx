import {
  Box,
  Container,
  Flex,
  Heading,
  Wrap,
  WrapItem,
  Text,
  VStack,
  Button,
  HStack,
  IconButton,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";

const ContactUs = () => {
  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg={"gray.700"}
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Flex gap={{ base: 20, sm: 3, md: 5, lg: 20 }} flexWrap={"wrap"}>
              <Box>
                <Heading>Contact</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                  Fill up the form provided to contact our support
                </Text>
                <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                  <Flex flexDirection="column" gap={4} minW="16em">
                    <Button
                      size="md"
                      height="48px"
                      variant="solid"
                      color="#DCE2FF"
                      _hover={{ border: "2px solid #1C6FEB" }}
                      leftIcon={<MdPhone color="#1970F1" size="20px" />}
                    >
                      +60-196491542
                    </Button>
                    <Button
                      size="md"
                      height="48px"
                      variant="solid"
                      color="#DCE2FF"
                      _hover={{ border: "2px solid #1C6FEB" }}
                      leftIcon={<MdEmail color="#1970F1" size="20px" />}
                    >
                      support@serveutm.online
                    </Button>
                    <Button
                      size="md"
                      height="48px"
                      variant="solid"
                      color="#DCE2FF"
                      _hover={{ border: "2px solid #1C6FEB" }}
                      leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                    >
                      Semarak, Kuala Lumpur
                    </Button>
                  </Flex>
                </Box>
                <Flex
                  alignItems="center"
                  justifyContent={"center"}
                  minW={"full"}
                >
                  <IconButton
                    aria-label="github"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: "#0D74FF" }}
                    icon={<BsGithub size="28px" />}
                    onClick={() =>
                      (window.location.href =
                        "https://github.com/afiqsuradi/serveutm-one-stop-center")
                    }
                  />
                </Flex>
              </Box>
              <Box bg="white" borderRadius="lg">
                <Box m={8} color="#0B0E3F">
                  <VStack spacing={5}>
                    <FormControl id="name">
                      <FormLabel>Your Name</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <BsPerson color="gray.800" />
                        </InputLeftElement>
                        <Input type="text" size="md" />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel>Mail</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <MdOutlineEmail color="gray.800" />
                        </InputLeftElement>
                        <Input type="text" size="md" />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        borderColor="gray.300"
                        _hover={{
                          borderRadius: "gray.300",
                        }}
                        placeholder="message"
                      />
                    </FormControl>
                    <FormControl id="name" float="right">
                      <Button
                        variant="solid"
                        bg="#0D74FF"
                        color="white"
                        _hover={{}}
                      >
                        Send Message
                      </Button>
                    </FormControl>
                  </VStack>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default ContactUs;
