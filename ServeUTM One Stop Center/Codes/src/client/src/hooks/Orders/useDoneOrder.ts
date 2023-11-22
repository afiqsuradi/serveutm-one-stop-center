import { useRefresh } from "../Auth/useRefresh";
import usePost from "../usePost";
import { AxiosResponse } from "axios";

const useDoneOrder = () => {
  const refresh = useRefresh();
  const { isLoading, post, error } = usePost<string, AxiosResponse>(
    "/api/orders/approve",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const markAsDone = async (id: string) => {
    try {
      const result = await post(JSON.stringify({ id }));
      if (result && result.status >= 200 && result.status < 300) {
        await refresh();
      }
    } catch (error) {
      //
    }
  };

  return { markAsDone, isLoading, error };
};

export default useDoneOrder;
