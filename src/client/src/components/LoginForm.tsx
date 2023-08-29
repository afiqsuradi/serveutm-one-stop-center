import { useForm } from "react-hook-form";
import useLogin, { LoginFormData } from "../hooks/useLogin";

const LoginForm = () => {
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
            htmlFor="email"
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
              className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <a
                href="#"
                className="font-semibold text-[#818cf8] hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {/* <p className="text-sm text-red-600">
            {errors.username ? errors.username.message : ""}
          </p> */}
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
