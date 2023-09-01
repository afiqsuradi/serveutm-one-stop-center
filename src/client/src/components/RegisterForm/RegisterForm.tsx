import { useForm } from "react-hook-form";
import {
  RegisterFormStruct,
  RegisterFormStructResolver,
} from "../../types/register";
import useRegister from "../../hooks/useRegister";
import ErrorLabel from "./ErrorLabel";

const RegisterForm = () => {
  const { registerUser, error, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormStruct>({ resolver: RegisterFormStructResolver });

  return (
    <>
      {error ? (
        <div
          className="mb-4 rounded-lg bg-red-100 px-6 py-5 text-base text-red-700"
          role="alert"
        >
          {error}
        </div>
      ) : (
        ""
      )}
      <form
        className="space-y-6"
        action="#"
        method="POST"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => void registerUser(data))}
      >
        <div>
          <label
            htmlFor="name"
            className="text-base font-medium leading-6 text-[#e5e7eb] flex justify-between"
          >
            Full Name
            {errors.name ? (
              <ErrorLabel>{errors.name.message as string}</ErrorLabel>
            ) : (
              ""
            )}
          </label>

          <div className="mt-2">
            <input
              {...register("name")}
              id="name"
              name="name"
              type="string"
              required
              className="block w-full rounded-md bg-white px-3 outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            className="text-base font-medium leading-6 text-[#e5e7eb] flex justify-between"
          >
            Username
            {errors.username ? (
              <ErrorLabel>{errors.username.message as string}</ErrorLabel>
            ) : (
              ""
            )}
          </label>
          <div className="mt-2">
            <input
              {...register("username")}
              id="username"
              name="username"
              type="string"
              required
              className="block w-full rounded-md bg-white px-3 outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-base font-medium leading-6 text-[#e5e7eb]  flex justify-between"
          >
            Email
            {errors.email ? (
              <ErrorLabel>{errors.email.message as string}</ErrorLabel>
            ) : (
              ""
            )}
          </label>
          <div className="mt-2">
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              required
              className="block w-full rounded-md px-3 bg-white outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
          <div className="pt-2">
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              required
              className="block w-full pr-8 outline-none bg-white rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          <div className="pt-2">
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="block w-full pr-8 outline-none rounded-md bg-white px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            disabled={!isLoading}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
