import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BsDashLg } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { UserProfile } from "../../interface/ProviderInfo";

interface Props {
  UserData: UserProfile;
}

const ProviderInfo = ({ UserData }: Props) => {
  return (
    <Card>
      <CardBody>
        <Stack spacing={3}>
          <Heading as="h2" fontSize="md">
            Description
          </Heading>
          <Text>{UserData.description}</Text>
        </Stack>
        <Divider marginY={5} />
        <Stack spacing={3}>
          <Heading as="h2" fontSize="md">
            Languages
          </Heading>
          <HStack>
            {UserData.language.map((lang) => {
              return (
                <>
                  <Text>{lang.name}</Text>
                  <BsDashLg />
                  <Text color="gray.300">{lang.level}</Text>
                </>
              );
            })}
          </HStack>
        </Stack>
        <Divider marginY={5} />
        <Stack spacing={4}>
          <Heading as="h2" fontSize="md">
            Skills
          </Heading>
          <Flex>
            {UserData.skills.map((skill) => {
              return (
                <Box paddingX={"1"}>
                  <Tooltip label={skill.level} aria-label="Skill Level">
                    <Badge colorScheme="purple">{skill.name}</Badge>
                  </Tooltip>
                </Box>
              );
            })}
          </Flex>
        </Stack>
        <Divider marginY={5} />
      </CardBody>
      <CardFooter>
        <Link href={UserData.PersonalWebsite || "#"} isExternal>
          <HStack>
            <Text>Personal Wesite</Text>
            <AiOutlineLink display="inline" mx="2px" />
          </HStack>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProviderInfo;
