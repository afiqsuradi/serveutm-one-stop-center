import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import RegisterProviderForm from "../components/RegisterProviderForm";

const RegisterProvider = () => {
  return (
    <Box paddingY="5">
      <Card maxW="90%" marginX="auto">
        <CardHeader maxW="60%">
          <Stack spacing={4}>
            <Heading as="h1" fontSize="4xl">
              Professional Info
            </Heading>
            <Divider maxW="35%" />
            <Text fontSize="md">
              Tell us a bit about yourself. This information will appear on your
              public profile, so that potential buyers can get to know you
              better.
            </Text>
          </Stack>
        </CardHeader>
        <Divider marginX="auto" maxW="95%" marginY="1em" />
        <CardBody>
          <RegisterProviderForm />
        </CardBody>
      </Card>
    </Box>
  );
};

export default RegisterProvider;
