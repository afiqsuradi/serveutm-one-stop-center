import { useForm } from "react-hook-form";
import useLogin, { LoginFormData } from "../hooks/useLogin";

const LoginForm = () => {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit } = useForm<LoginFormData>();
  return (
    <form
      className="space-y-6"
      method="POST"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => login(data))}
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900  dark:text-slate-50"
        >
          Username
        </label>
        <div className="mt-2">
          <input
            {...register("username")}
            id="username"
            name="username"
            type="text"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
          >
            Password
          </label>
          <div className="text-sm">
            <a
              href="https://localhost:5173/password-reset"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
