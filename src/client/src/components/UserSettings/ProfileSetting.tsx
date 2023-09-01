import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileSetting = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Card
      flex={2}
      justifyContent="center"
      alignItems="center"
      paddingX="8"
      maxWidth="65rem"
    >
      <CardHeader
        minWidth="full"
        paddingX="0"
        minHeight="20%"
        className="flex items-center"
      >
        <Heading textAlign="start" paddingY={4}>
          Edit Profile
        </Heading>
      </CardHeader>
      <CardBody
        paddingX="0"
        paddingY="8"
        minWidth="full"
        className="flex items-center"
      >
        <form className="min-w-full">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <HStack justifyContent="space-around" pt="8">
              <Button
                minW="10rem"
                backgroundColor="#9e47e5"
                _hover={{
                  backgroundColor: "#7037d9",
                }}
                type="submit"
              >
                Update Info
              </Button>
              <Button
                minW="10rem"
                colorScheme="red"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Change Password
              </Button>
            </HStack>
          </Stack>
        </form>
      </CardBody>
      <CardFooter minWidth="full" paddingX="0" pt="0" minH="20%"></CardFooter>
    </Card>
  );
};

export default ProfileSetting;
