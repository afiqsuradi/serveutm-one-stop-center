import {
  Badge,
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
import useUserProfile from "../../hooks/useUserProfile";

interface Props {
  username: string;
}

const ProviderInfo = ({ username }: Props) => {
  const { data } = useUserProfile(username);
  return (
    <Card>
      <CardBody>
        <Stack spacing={3}>
          <Heading as="h2" fontSize="md">
            Description
          </Heading>
          <Text>{data.description}</Text>
        </Stack>
        <Divider marginY={5} />
        <Stack spacing={3}>
          <Heading as="h2" fontSize="md">
            Languages
          </Heading>
          <HStack>
            {data.language.map((lang) => {
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
            {data.skills.map((skill) => {
              return (
                <>
                  <Tooltip label={skill.level} aria-label="Skill Level">
                    <Badge colorScheme="purple">{skill.name}</Badge>
                  </Tooltip>
                </>
              );
            })}
          </Flex>
        </Stack>
        <Divider marginY={5} />
      </CardBody>
      <CardFooter>
        <Link href="#" isExternal>
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
