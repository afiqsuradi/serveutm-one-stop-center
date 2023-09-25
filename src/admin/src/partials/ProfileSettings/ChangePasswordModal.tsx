import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import {
  PasswordChangeFormStruct,
  PasswordChangeFormStructResolver,
} from "../../types/changePassword";
import useChangePassword from "../../hooks/useChangePassword";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  target?: string;
}

const ChangePasswordModal = ({ isOpen, setIsOpen, target }: Props) => {
  const { isLoading, updatePassword } = useChangePassword(target);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordChangeFormStruct>({
    resolver: PasswordChangeFormStructResolver,
  });
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#1D283A] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900 dark:text-white"
                  >
                    Change Password
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      className="min-w-full flex flex-col gap-4"
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onSubmit={handleSubmit((data) => {
                        void updatePassword(data);
                        reset();
                      })}
                    >
                      <div className="form-control w-full text-white ">
                        <label className="label ">
                          <span className="label-text text-black dark:text-white">
                            Current Password
                          </span>
                          <span className="label-text-alt text-red-400">
                            {errors.currentPassword
                              ? errors.currentPassword.message
                              : ""}
                          </span>
                        </label>
                        <input
                          {...register("currentPassword")}
                          type="password"
                          name="currentPassword"
                          id="currentPassword"
                          className="input input-bordered min-w-full"
                        />
                      </div>
                      <div className="form-control w-full text-white ">
                        <label className="label ">
                          <span className="label-text text-black dark:text-white">
                            New Password
                          </span>
                          <span className="label-text-alt text-red-400">
                            {errors.newPassword
                              ? errors.newPassword.message
                              : ""}
                          </span>
                        </label>
                        <input
                          {...register("newPassword")}
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="form-control w-full text-white ">
                        <label className="label ">
                          <span className="label-text text-black dark:text-white">
                            Confirm New Password
                          </span>
                          <span className="label-text-alt text-red-400">
                            {errors.confirmPassword
                              ? errors.confirmPassword.message
                              : ""}
                          </span>
                        </label>
                        <input
                          {...register("confirmPassword")}
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className="input input-bordered w-full"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-secondary flex-1"
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          "Change Password"
                        )}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChangePasswordModal;
