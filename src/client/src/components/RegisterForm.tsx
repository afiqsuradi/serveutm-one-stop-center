import { useForm } from "react-hook-form";
import {
  RegisterFormStruct,
  RegisterFormStructResolver,
} from "../types/register";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";
import { REGISTER_SUCCESS } from "../constants/path";
import { useAuth } from "../hooks/useAuth";
import { AuthType } from "../context/authProvider";
import { useState } from "react";
import { AxiosError } from "axios";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormStruct>({ resolver: RegisterFormStructResolver });

  const onSubmit = async (data: RegisterFormStruct) => {
    try {
      const result = await apiClient.post<AuthType>(
        "/api/user",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuth(result.data);
      navigate(REGISTER_SUCCESS);
    } catch (error) {
      setError((error as AxiosError).message);
    }
  };

  return (
    <form
      className="flex flex-col"
      method="POST"
      action="#"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => {
        return onSubmit(data);
      })}
    >
      {error}
      <div className="flex gap-4">
        <div className="mb-6 pt-3 rounded bg-gray-200">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 ml-3"
            htmlFor="name"
          >
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
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
          {errors.username && errors.username.message}
        </div>
      </div>
      <div className="mb-6 pt-3 rounded bg-gray-200">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 ml-3"
          htmlFor="email"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="text"
          id="email"
          className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
        />
        {errors.email && errors.email.message}
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
        {errors.password && errors.password.message}
      </div>
      <div className="mb-6 pt-3 rounded bg-gray-200">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 ml-3"
          htmlFor="passwordConfirm"
        >
          Confirm Password
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          id="passwordConfirm"
          className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
        />
        {errors.confirmPassword && errors.confirmPassword.message}
      </div>

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
