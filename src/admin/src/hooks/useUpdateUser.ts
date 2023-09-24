import { AxiosResponse } from "axios";
import { ProfileUpdateFormStruct } from "../types/profile";
import usePut from "./usePut";
import { toast } from "react-toastify";
import { useRefresh } from "./useRefresh";

const useUpdateUser = (target: string) => {
  const refresh = useRefresh();
  const { isLoading, put } = usePut<string, AxiosResponse>("/api/user", {
    headers: { "Content-Type": "application/json" },
    params: {
      user: target,
    },
  });

  const updateUser = async (data: ProfileUpdateFormStruct) => {
    const response = await put(JSON.stringify(data));
    if (response) {
      await refresh();
      toast.success("Data successfully updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return { isLoading, updateUser };
};

export default useUpdateUser;
