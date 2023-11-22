import { toast } from "react-toastify";
import useDelete from "../useDelete";
import { useRefresh } from "../useRefresh";

const useDeleteInquiry = () => {
  const refresh = useRefresh();
  const { isLoading, deleteReq } = useDelete();

  const deleteInquiry = async (id: string) => {
    const response = await deleteReq<{ message: string }>(`api/inquiry/${id}`);
    if (response) {
      await refresh();
      toast.success("Inquiry successfully deleted", {
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
  return { deleteInquiry, isLoading };
};

export default useDeleteInquiry;
