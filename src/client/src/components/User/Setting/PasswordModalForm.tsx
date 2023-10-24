import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import useChangePassword from "@/hooks/User/useChangePassword";
import {
  PassChangeStruct,
  PassChangeStructResolver,
} from "@/types/userDataRule";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PasswordModalForm = ({ isOpen, setIsOpen }: Props) => {
  const { update, isLoading, error } = useChangePassword();
  const form = useForm<PassChangeStruct>({
    resolver: PassChangeStructResolver,
    defaultValues: {
      currentPassword: "",
      confirmPassword: "",
      newPassword: "",
    },
  });

  const updatePass = (data: PassChangeStruct) => {
    update(data);
  };
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(updatePass)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Change you password here. Click update when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {error.length > 0 && (
                <Alert className="text-start" variant={"destructive"}>
                  <FaExclamation />
                  <AlertTitle>Failed to change password</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModalForm;
