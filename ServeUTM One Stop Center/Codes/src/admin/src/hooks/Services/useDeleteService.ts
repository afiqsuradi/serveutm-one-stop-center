import { toast } from "react-toastify";
import useDelete from "../useDelete";
import { useRefresh } from "../useRefresh";

const useDeleteService = () => {
  const refresh = useRefresh();
  const { isLoading, deleteReq } = useDelete();

  const deleteService = async (username: string, id: string) => {
    const response = await deleteReq<{ message: string }>(
      `api/services/${username}`,
      { data: { serviceId: id } }
    );
    if (response) {
      await refresh();
      toast.success("Service has been successfully deleted", {
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
  return { deleteService, isLoading };
};

export default useDeleteService;
