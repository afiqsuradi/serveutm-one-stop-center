import { useForm } from "react-hook-form";
import apiClient from "../services/apiClient";
import { AuthType } from "../context/authProvider";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";
import { useState } from "react";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await apiClient.post<AuthType>(
        "/api/auth",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuth(result.data);
    } catch (error) {
      setError((error as AxiosError).message);
    }
  };

  return (
    <>
      {error}
      <form
        className="flex flex-col"
        method="POST"
        action="#"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="mb-6 pt-3 rounded bg-gray-200">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-3"
            htmlFor="username"
          >
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <div className="mb-6 pt-3 rounded bg-gray-200">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-3"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <div className="flex justify-end">
          <a
            href="#"
            className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6"
          >
            Forgot your password?
          </a>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </>
  );
};

export default LoginForm;
