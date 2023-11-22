import { toast } from "react-toastify";
import useDelete from "../useDelete";
import { useRefresh } from "../useRefresh";

const useDeleteUser = () => {
  const refresh = useRefresh();
  const { isLoading, deleteReq } = useDelete();

  const deleteUser = async (username: string) => {
    const response = await deleteReq<{ message: string }>(
      `api/user/${username}`
    );
    if (response) {
      await refresh();
      toast.success("User successfully deleted", {
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
  return { deleteUser, isLoading };
};

export default useDeleteUser;
