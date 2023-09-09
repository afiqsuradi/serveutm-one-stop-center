import { useForm } from "react-hook-form";
import useRequestReset, {
  passwordResetRequestFormData,
} from "../hooks/useRequestReset";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  ModalFooter,
} from "@chakra-ui/react";
import ROUTES from "../constants/path";
import { useNavigate } from "react-router-dom";

const ResetPasswordRequestForm = () => {
  const navigate = useNavigate();
  const { success, isLoading, requestPasswordReset } = useRequestReset();
  const { register, handleSubmit } = useForm<passwordResetRequestFormData>();
  const onClose = () => {
    return navigate(ROUTES.HOMEPAGE);
  };
  return (
    <>
      {/* todo: create modal once done reset */}
      <Modal blockScrollOnMount={false} isOpen={success} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Successfully Request Passord Reset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Please check your email for further instruction.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Return to homepage
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <form
        className="space-y-6"
        action="#"
        method="POST"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => {
          void requestPasswordReset(data);
        })}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-base font-medium leading-6 text-[#e5e7eb]"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              required
              className="block w-full bg-white rounded-md px-3 outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <Button
            variant="base"
            isLoading={isLoading}
            loadingText="Requesting.."
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Request Reset
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordRequestForm;
