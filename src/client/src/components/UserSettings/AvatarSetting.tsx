import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";

const AvatarSetting = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  return (
    <Card
      flex={1}
      justifyContent="center"
      alignItems="center"
      maxWidth="fit-content"
      paddingX="10"
    >
      <CardHeader>
        {" "}
        <Heading as="h1" size="lg" noOfLines={1} paddingY="3">
          Aiman Afiq
        </Heading>
        <Heading as="h2" size="md" noOfLines={1} textAlign="center">
          @afiq3067
        </Heading>
      </CardHeader>
      <CardBody textAlign="center" marginY="auto" className="flex items-center">
        <VStack gap={6} w="full" justify="center" align="center">
          <Avatar
            size="2xl"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Button
            backgroundColor="#9e47e5"
            _hover={{
              backgroundColor: "#7037d9",
            }}
            type="button"
            onClick={() => {
              if (imageInput.current) {
                imageInput.current.click();
              }
            }}
          >
            Select Image
          </Button>
          <Input ref={imageInput} type="file" accept="image/*" hidden />
          <Box border="2px" borderStyle="dotted" p={4} maxW="200px">
            <Text>
              Upload a new avatar. Larger image will be resized automatically.
            </Text>
          </Box>
        </VStack>
      </CardBody>
      <CardFooter paddingTop="0">
        <Text>Member since 1 September 2023</Text>
      </CardFooter>
    </Card>
  );
};

export default AvatarSetting;
