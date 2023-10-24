import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useDeleteGig from "@/hooks/Gigs/useDeleteGig";
import Spinner from "../ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";

interface Props {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const DeleteServicePrompt = ({ id, isOpen, setIsOpen }: Props) => {
  const { deleteGig, isLoading, error, success } = useDeleteGig();
  const { toast } = useToast();

  const onDelete = () => {
    deleteGig(id);
  };

  useEffect(() => {
    if (success) {
      toast({
        variant: "destructive",
        description: "Successfully deleted a gig",
      });
    }
    return () => {
      if (success) {
        setIsOpen(false);
      }
    };
  }, [success]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Gig
            and remove your Gig data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-2">
          {error && (
            <Alert className="text-start" variant={"destructive"}>
              <FaExclamation />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-[6rem]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/70 w-[6rem]"
            disabled={isLoading}
            onClick={onDelete}
          >
            {isLoading ? <Spinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteServicePrompt;
