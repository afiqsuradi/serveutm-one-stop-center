import { ServiceContext } from "@/context/gigProvider";
import { useContext } from "react";

export const useGig = () => {
  return useContext(ServiceContext);
};
