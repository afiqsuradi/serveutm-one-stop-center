import { Navigate, useLocation } from "react-router-dom";
import ROUTES from "../constants/path";
import useValidResetToken from "../hooks/useValidResetToken";
import { useForm } from "react-hook-form";
import ErrorLabel from "./RegisterForm/ErrorLabel";
import apiClient from "../services/apiClient";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorData } from "../hooks/useLogin";
import {
  PasswordResetFormStruct,
  PasswordResetFormStructResolver,
} from "../types/passwordReset";

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const { success, isLoading: isLoadingVerify } = useValidResetToken(
    token ? token : ""
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormStruct>({
    resolver: PasswordResetFormStructResolver,
  });
  if (!isLoadingVerify && !success)
    return <Navigate to={ROUTES.HOMEPAGE} replace />;

  const resetPassword = (data: PasswordResetFormStruct) => {
    apiClient
      .post("/api/forgot-password/reset", JSON.stringify({ ...data, token }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 202) {
          setResetSuccess(true);
        }
      })
      .catch((err) => {
        setResetSuccess(false);
        setError((err as AxiosError<ErrorData>).message);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      {!isLoading && resetSuccess ? (
        <div
          className="mb-4 rounded-lg bg-green-100 px-6 py-5 text-base text-green-700"
          role="alert"
        >
          Successfully reset password
        </div>
      ) : !isLoading && !(error.length === 0) ? (
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
        onSubmit={handleSubmit((data) => {
          resetPassword(data);
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
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
