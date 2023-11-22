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
import { useRefresh } from "../../../hooks/useRefresh";
import ROUTES from "../../../constants/path";

interface Props {
  isOpen: boolean;
}

const GigsAddSuccessOverlay = ({ isOpen }: Props) => {
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
            Gigs Added
          </AlertDialogHeader>

          <AlertDialogBody>
            Please wait while our admin to approve your gigs. <br />
            The process may take eternity.
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

export default GigsAddSuccessOverlay;
