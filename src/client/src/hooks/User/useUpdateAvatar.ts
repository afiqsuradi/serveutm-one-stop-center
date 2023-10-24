import usePost from "../usePost";
import { AuthType } from "@/context/authProvider";
import { useAuth } from "../Auth/useAuth";
import { useRefresh } from "../Auth/useRefresh";
import { useToast } from "@/components/ui/use-toast";

const useUpdateAvatar = () => {
  const { toast } = useToast();
  const refresh = useRefresh();
  const { isLoading, post, error } = usePost<FormData, AuthType>(
    "api/profile-image/upload",
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  const { setAuth } = useAuth();
  const update = async (data: FormData) => {
    try {
      const result = await post(data);
      if (result && result.status >= 200 && result.status < 300) {
        setAuth((prev) => {
          return { ...prev, profileImage: result.data.profileImage };
        });
        toast({
          variant: "success",
          description: "Successfully updated avatar.",
        });
        await refresh();
      }
    } catch (error) {
      //
    }
  };

  return { update, isLoading, error };
};

export default useUpdateAvatar;
