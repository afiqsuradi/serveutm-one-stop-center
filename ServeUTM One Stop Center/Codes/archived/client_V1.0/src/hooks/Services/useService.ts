import { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import apiClient from "../../services/apiClient";

export const GigsTypeOption = [
  "Technical Expertise",
  "Service",
  "Education",
] as const;

export type PricingPackageType = {
  title: string;
  description: string;
  price: number;
};

export type FaqType = {
  question: string;
  answer: string;
};

export type OwnerType = {
  profileImage: string;
  name: string;
  username: string;
};

export type ServiceType = {
  _id?: string;
  owner?: OwnerType;
  title: string;
  description: string;
  category: (typeof GigsTypeOption)[number] | "";
  faq: FaqType[];
  pricePackage: PricingPackageType[];
  images: string[];
  isApproved?: string;
};

export interface UserInfo {
  profileImage: string;
  name: string;
  username: string;
  email: string;
  dateJoined: string;
}

const useService = (id: string) => {
  const { Auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ServiceType>();
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    apiClient
      .get<ServiceType>(`api/services/${id}`, {
        signal: controller.signal,
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        //
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [Auth.accessToken, id]);
  return { data, loading };
};

export default useService;
