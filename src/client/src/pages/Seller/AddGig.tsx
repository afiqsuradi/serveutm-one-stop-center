import { useState } from "react";
import AddGigsBreadcrump from "../../components/Seller/AddGigs/AddGigsBreadcrump";
import DescriptionForm from "../../components/Seller/AddGigs/DescriptionForm";
import GalleryForm from "../../components/Seller/AddGigs/GalleryForm";
import OverviewForm from "../../components/Seller/AddGigs/OverviewForm";
import useMultiStepForm from "../../hooks/useMultiStepForm";

export type PricingPackageType = {
  title: string;
  description: string;
  price: number;
};

export type ServiceType = {
  title: string;
  category: string;
  pricePackage: PricingPackageType[];
};

const defaultServiceType = {
  title: "",
  category: "",
  pricePackage: [{ title: "", description: "", price: 0 }],
};

const AddGig = () => {
  const [serviceData, setServiceData] =
    useState<ServiceType>(defaultServiceType);
  const { currentStepIndex, highestStepIndex, next, goto, prev, steps, step } =
    useMultiStepForm([
      <OverviewForm
        serviceData={serviceData}
        setServiceData={setServiceData}
      />,
      <DescriptionForm />,
      <GalleryForm />,
    ]);
  return (
    <div>
      <AddGigsBreadcrump currentIndex={currentStepIndex} />
      {step}
    </div>
  );
};

export default AddGig;
