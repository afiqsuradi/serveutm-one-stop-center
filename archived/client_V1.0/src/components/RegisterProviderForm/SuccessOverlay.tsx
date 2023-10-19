import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/path";
import { useRefresh } from "../../hooks/useRefresh";

interface Props {
  isOpen: boolean;
}

const SuccessOverlay = ({ isOpen }: Props) => {
  const refresh = useRefresh();
  const navigate = useNavigate();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const onClose = async () => {
    await refresh();
    navigate(ROUTES.USER_PROFILE);
  };
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => void onClose()}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Updated Profile
          </AlertDialogHeader>

          <AlertDialogBody>
            You have been successfully registered as service provider.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => void onClose()}
              colorScheme="green"
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SuccessOverlay;
