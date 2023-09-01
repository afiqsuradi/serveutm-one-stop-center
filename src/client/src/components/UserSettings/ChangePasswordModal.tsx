import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  PasswordChangeFormStruct,
  PasswordChangeFormStructResolver,
} from "../../types/changePassword";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import { ErrorData } from "../../hooks/useLogin";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordModal = ({ isOpen, setIsOpen }: Props) => {
  const toast = useToast();
  const privateApiClient = useAxiosPrivate();
  const { register, handleSubmit, reset } = useForm<PasswordChangeFormStruct>({
    resolver: PasswordChangeFormStructResolver,
  });
  const changeUserPassword = async (data: PasswordChangeFormStruct) => {
    try {
      const res = await privateApiClient.put(
        "/api/user/password",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res) {
        toast({
          title: "Password Changed.",
          description: "Your password have been successfully changed.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        reset();
        setIsOpen(!isOpen);
      }
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
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(!open)}>
      <ModalOverlay />
      <ModalContent>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit((data) => {
            void changeUserPassword(data);
          })}
        >
          <ModalHeader>Change Your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Current Password</FormLabel>
              <Input
                {...register("currentPassword")}
                type="password"
                id="currentPassword"
                name="currentPassword"
                required
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                {...register("newPassword")}
                type="password"
                id="newPassword"
                name="newPassword"
                required
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
