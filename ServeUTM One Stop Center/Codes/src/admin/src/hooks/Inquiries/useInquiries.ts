import { useAuth } from "../useAuth";
import useData from "../useData";

export type Inquiry = {
  _id: string;
  name: string;
  email: string;
  message: string;
};

type InquiriesResponse = {
  count: number;
  inquiries: Inquiry[];
};

export const InquiryFilterOption = ["email", "name"] as const;
export type InquiryFilterType = {
  textInput?: string;
  type?: (typeof InquiryFilterOption)[number];
  page?: number;
  limit: number;
};

const useInquiries = (filters: InquiryFilterType) => {
  const { Auth } = useAuth();
  const query = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const { isLoading, response, setError } = useData<InquiriesResponse>(
    `/api/inquiry?${query}`,
    {},
    [filters, Auth.accessToken]
  );
  return { data: response, isLoading, setError };
};

export default useInquiries;
