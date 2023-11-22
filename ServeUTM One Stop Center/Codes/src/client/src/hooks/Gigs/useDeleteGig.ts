import useDelete from "../useDelete";
import { AxiosResponse } from "axios";
import { useAuth } from "../Auth/useAuth";
import { useState } from "react";
import { useRefresh } from "../Auth/useRefresh";

const useDeleteGig = () => {
  const [success, setSuccess] = useState(false);
  const refresh = useRefresh();
  const { Auth } = useAuth();
  const { isLoading, onDelete, error } = useDelete<
    { serviceId: string },
    AxiosResponse
  >(`api/services/${Auth.username}`);
  const deleteGig = async (id: string) => {
    try {
      const result = await onDelete({
        serviceId: id,
      });
      if (result && result.status >= 200 && result.status < 300) {
        setSuccess(true);
        await refresh();
      }
    } catch (error) {
      //
    }
  };

  return { deleteGig, isLoading, error, success };
};

export default useDeleteGig;
