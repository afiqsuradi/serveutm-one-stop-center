import { useForm } from "react-hook-form";
import useProfile from "../../hooks/useProfile";
import {
  ProfileUpdateFormStruct,
  ProfileUpdateFormStructResolver,
} from "../../types/profile";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useUpdateUser from "../../hooks/useUpdateUser";
import ChangePasswordModal from "./ChangePasswordModal";

const ProfileInfoSettings = ({ username }: { username: string }) => {
  const { Auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { response } = useProfile(username, [Auth.accessToken]);
  const { isLoading, updateUser } = useUpdateUser(username);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileUpdateFormStruct>({
    resolver: ProfileUpdateFormStructResolver,
  });

  useEffect(() => {
    setValue("name", response?.name || "");
    setValue("email", response?.email || "");
    setValue("username", response?.username || "");
  }, [response]);

  return (
    <>
      <ChangePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="card w-96 bg-white text-black shadow-xl dark:bg-[#1D283A] dark:text-white mx-auto min-w-full">
        <div className="card-body">
          <h2 className="card-title">Change User Information</h2>
          <form
            className="min-w-full flex flex-col gap-4"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit((data) => void updateUser(data))}
          >
            <div className="form-control w-full text-white ">
              <label className="label ">
                <span className="label-text text-black dark:text-white">
                  Full Name
                </span>
                <span className="label-text-alt text-red-400">
                  {errors.name ? errors.name.message : ""}
                </span>
              </label>
              <input
                {...register("name")}
                defaultValue={response?.name}
                type="text"
                name="name"
                id="name"
                className="input input-bordered min-w-full"
              />
            </div>
            <div className="form-control w-full text-white ">
              <label className="label ">
                <span className="label-text text-black dark:text-white">
                  Username
                </span>
                <span className="label-text-alt text-red-400">
                  {errors.username ? errors.username.message : ""}
                </span>
              </label>
              <input
                {...register("username")}
                defaultValue={response?.username}
                type="text"
                name="username"
                id="username"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full text-white ">
              <label className="label ">
                <span className="label-text text-black dark:text-white">
                  Email
                </span>
                <span className="label-text-alt text-red-400">
                  {errors.email ? errors.email.message : ""}
                </span>
              </label>
              <input
                {...register("email")}
                defaultValue={response?.email}
                type="email"
                name="email"
                id="email"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex flex-row justify-between gap-4 flex-wrap sm:flex-nowrap">
              <button className="btn btn-primary flex-1" type="submit">
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Update"
                )}
              </button>
              {username === Auth.username ? (
                <button
                  type="button"
                  className="btn btn-secondary flex-1"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Change Password
                </button>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoSettings;
