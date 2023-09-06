import { useForm } from "react-hook-form";
import apiClient from "../services/apiClient";
import { useState } from "react";
import { ErrorData } from "../hooks/useLogin";
import { AxiosError } from "axios";
interface formData {
  email: string;
}
const ResetPasswordRequestForm = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const { register, handleSubmit } = useForm<formData>();

  const requestPasswordReset = (data: formData) => {
    apiClient
      .post("/api/forgot-password", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        params: {
          baseUrl: window.location.origin,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          setError("");
          setSuccess(true);
        }
      })
      .catch((err) => {
        setSuccess(false);
        setError(
          (err as AxiosError<ErrorData>).response?.data.message as string
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {!(error.length === 0) && !isLoading ? (
        <div
          className="mb-4 rounded-lg bg-red-100 px-6 py-5 text-base text-red-700"
          role="alert"
        >
          {error}
        </div>
      ) : success && !isLoading ? (
        <div
          className="mb-4 rounded-lg bg-green-100 px-6 py-5 text-base text-green-700"
          role="alert"
        >
          Kindly check your email for further instruction
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
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Request Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordRequestForm;
