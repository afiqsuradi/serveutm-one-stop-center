import { toast } from "react-toastify";
import usePost from "./usePost";
import { useRefresh } from "./useRefresh";

const useUploadImage = (username?: string) => {
  const refresh = useRefresh();
  const { post } = usePost("api/profile-image/upload", {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
    params: {
      user: username,
    },
  });

  const uploadProfile = async (data: FileList) => {
    const formData = new FormData();
    formData.append("image", data[0]);
    const response = await post(formData);
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
  return { uploadProfile };
};

export default useUploadImage;
