import { useLocation, useNavigate } from "react-router-dom";
import useValidResetToken from "../hooks/useValidResetToken";
import { useForm } from "react-hook-form";
import {
  PasswordResetFormStruct,
  PasswordResetFormStructResolver,
} from "../types/passwordReset";
import useResetPassword from "../hooks/useResetPassword";
import ErrorLabel from "./RegisterForm/ErrorLabel";
import ROUTES from "../constants/path";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token") || "";
  useValidResetToken(token);
  const { success, isLoading, resetPassword } = useResetPassword(token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormStruct>({
    resolver: PasswordResetFormStructResolver,
  });

  const onClose = () => {
    navigate(ROUTES.LOGIN);
  };
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={success} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Successfull</ModalHeader>
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              You may now login with your new password
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <form
        className="space-y-6"
        action="#"
        method="POST"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(async (data) => {
          await resetPassword(data);
        })}
      >
        <div>
          <label
            htmlFor="password"
            className="text-base font-medium leading-6 text-[#e5e7eb]  flex justify-between"
          >
            Password
            {errors.password ? (
              <ErrorLabel>{errors.password.message as string}</ErrorLabel>
            ) : (
              ""
            )}
          </label>
          <div className="mt-2">
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              required
              className="block w-full bg-white rounded-md px-3 outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-base font-medium leading-6 text-[#e5e7eb]  flex justify-between"
          >
            Confirm Password
            {errors.confirmPassword ? (
              <ErrorLabel>
                {errors.confirmPassword.message as string}
              </ErrorLabel>
            ) : (
              ""
            )}
          </label>
          <div className="mt-2">
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="block w-full bg-white rounded-md px-3 outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <Button
            isLoading={isLoading}
            loadingText="Resetting..."
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
