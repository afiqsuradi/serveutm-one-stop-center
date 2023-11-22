import { ServiceType } from "@/interface/Service";
import { createContext, useState } from "react";

const defaultGigValue: ServiceType = {
  title: "",
  description: "",
  category: "",
  faq: [{ question: "", answer: "" }],
  pricePackage: [{ title: "", description: "", price: 0 }],
  images: [""],
};

type GigContextType = {
  service: ServiceType;
  setService: React.Dispatch<React.SetStateAction<ServiceType>>;
};

export const ServiceContext = createContext<GigContextType>({
  service: defaultGigValue,
  setService: () => defaultGigValue,
});

interface Props {
  children: React.ReactNode;
}

export const ServiceProvider = ({ children }: Props) => {
  const [service, setService] = useState<ServiceType>(defaultGigValue);

  return (
    <ServiceContext.Provider value={{ service, setService }}>
      {children}
    </ServiceContext.Provider>
  );
};
