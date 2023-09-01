import { useForm } from "react-hook-form";
import useLogin, { LoginFormData } from "../hooks/useLogin";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PASSWORD_RESET } from "../constants/path";
const LoginForm = () => {
  const [show, setShow] = useState(false);
  const { login, error, isLoading } = useLogin();
  const { register, handleSubmit } = useForm<LoginFormData>();
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
        onSubmit={handleSubmit((data) => void login(data))}
      >
        <div>
          <label
            htmlFor="username"
            className="block text-base font-medium leading-6 text-[#e5e7eb]"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              {...register("username")}
              id="username"
              name="username"
              type="string"
              required
              className="block w-full rounded-md px-3 bg-white outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-base font-medium leading-6 text-[#e5e7eb]"
            >
              Password
            </label>
            <div className="text-base">
              <Link
                to={PASSWORD_RESET}
                className="font-semibold text-[#818cf8] hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="pt-2 relative">
            <input
              {...register("password")}
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              required
              className="block w-full pr-8 bg-white outline-none rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div
              className="absolute pt-2 top-1/2 right-1 transform -translate-y-1/2 hover:cursor-pointer"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? (
                <AiOutlineEye className="w-7 h-auto" />
              ) : (
                <AiOutlineEyeInvisible className="w-7 h-auto " />
              )}
            </div>
          </div>
        </div>

        <div>
          <button
            disabled={!isLoading}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
