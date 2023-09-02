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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuth } from "../../hooks/useAuth";
import { UserInfo } from "../../hooks/useUser";
interface ProfileUploadData {
  profileImage: string;
}

interface Props {
  info: UserInfo | undefined;
}
const AvatarSetting = ({ info }: Props) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const privateApiClient = useAxiosPrivate();
  const { Auth, setAuth } = useAuth();
  const uploadProfileImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      console.log(formData);
      await privateApiClient
        .post<ProfileUploadData>("api/profile-image/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then((res) => {
          setAuth({ ...Auth, profileImage: res.data.profileImage });
        });

      // do something after upload
    } catch (err) {
      console.error(err);
    }
  };
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
          {info?.name}
        </Heading>
        <Heading as="h2" size="md" noOfLines={1} textAlign="center">
          @{Auth.username}
        </Heading>
      </CardHeader>
      <CardBody textAlign="center" marginY="auto" className="flex items-center">
        <VStack gap={6} w="full" justify="center" align="center">
          <Avatar size="2xl" name="PFP" src={Auth.profileImage} />
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
          <Input
            ref={imageInput}
            id="image"
            name="image"
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => void uploadProfileImage(event)}
          />
          <Box border="2px" borderStyle="dotted" p={4} maxW="200px">
            <Text>
              Upload a new avatar. Larger image will be resized automatically.
            </Text>
          </Box>
        </VStack>
      </CardBody>
      <CardFooter paddingTop="0">
        <Text>Member since {info?.dateJoined}</Text>
      </CardFooter>
    </Card>
  );
};

export default AvatarSetting;
