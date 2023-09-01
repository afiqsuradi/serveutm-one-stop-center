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
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={() => console.log("closed")}>
      <ModalOverlay />
      <ModalContent>
        <form>
          <ModalHeader>Change Your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Current Password</FormLabel>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                required
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                required
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
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
