import { toast } from "react-toastify";
import { PasswordChangeFormStruct } from "../types/changePassword";
import usePut from "./usePut";
import { useRefresh } from "./useRefresh";

const useChangePassword = (target?: string) => {
  const refresh = useRefresh();
  const { isLoading, put } = usePut("/api/user/password", {
    headers: { "Content-Type": "application/json" },
    params: {
      user: target,
    },
  });

  const updatePassword = async (data: PasswordChangeFormStruct) => {
    const { success } = await put(JSON.stringify(data));
    if (success) {
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
  return { isLoading, updatePassword };
};

export default useChangePassword;
