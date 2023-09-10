import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  ProfileUpdateFormStruct,
  ProfileUpdateFormStructResolver,
} from "../../types/profile";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import { useRefresh } from "../../hooks/useRefresh";
import { AxiosError } from "axios";
import { UserInfo } from "../../hooks/useUser";
import { ErrorData } from "../../services/apiClient";
interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  info: UserInfo | undefined;
}

const ProfileSetting = ({ isOpen, setIsOpen, info }: Props) => {
  const refresh = useRefresh();
  const privateApiClient = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { register, handleSubmit } = useForm<ProfileUpdateFormStruct>({
    resolver: ProfileUpdateFormStructResolver,
  });
  const updateUserInfo = async (data: ProfileUpdateFormStruct) => {
    setLoading(true);
    try {
      await privateApiClient
        .put("/api/user", JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(async () => {
          await refresh();
          toast({
            title: "Profile Updated.",
            description: "Your profile has been successfully updated.",
            position: "top",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        });
    } catch (error) {
      if ((error as AxiosError<ErrorData>).response) {
        toast({
          title: "Failed to change password",
          description: `${
            (error as AxiosError<ErrorData>).response?.data.message as string
          }`,
          status: "error",
          isClosable: true,
        });
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box className="flex items-center">
      <form
        className="min-w-full"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => {
          void updateUserInfo(data);
        })}
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              {...register("name")}
              type="text"
              id="name"
              name="name"
              defaultValue={info?.name}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              {...register("username")}
              type="text"
              id="username"
              name="username"
              defaultValue={info?.username}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email")}
              type="email"
              id="email"
              name="email"
              defaultValue={info?.email}
            />
          </FormControl>
          <HStack justifyContent="space-around" pt="8">
            <Button
              disabled={loading}
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
              variant="danger"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Change Password
            </Button>
          </HStack>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileSetting;
