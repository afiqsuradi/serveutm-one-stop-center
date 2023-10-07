import { useEffect, useState } from "react";
import AddGigsBreadcrump from "../../components/Seller/AddGigs/AddGigsBreadcrump";
import DescriptionForm from "../../components/Seller/AddGigs/DescriptionForm";
import GalleryForm from "../../components/Seller/AddGigs/GalleryForm";
import OverviewForm from "../../components/Seller/AddGigs/OverviewForm";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import { Button, useToast } from "@chakra-ui/react";
import PublishGigs from "../../components/Seller/AddGigs/PublishGigs";
import useAddGigs from "../../hooks/Services/useAddGigs";
import { AxiosError } from "axios";
import { ErrorData } from "../../services/apiClient";
import GigsAddSuccessOverlay from "../../components/Seller/AddGigs/GigsAddSuccessOverlay";

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

export type ServiceType = {
  title: string;
  description: string;
  category: (typeof GigsTypeOption)[number] | "";
  faq: FaqType[];
  pricePackage: PricingPackageType[];
  images: string[];
  isApproved?: boolean;
};

const defaultServiceType = {
  title: "",
  description: "",
  category: "" as (typeof GigsTypeOption)[number] | "",
  faq: [{ question: "", answer: "" }],
  pricePackage: [{ title: "", description: "", price: 0 }],
  images: [],
};

const validator = {
  title: (title: string) => {
    if (title.length < 10)
      throw new Error("Title should be 10 - 70 characters");
  },
  category: (category: ServiceType["category"]) => {
    if (category === "") throw new Error("Please pick atleast 1 category");
  },
  pricePackage: (packages: ServiceType["pricePackage"]) => {
    const invalidPackage = packages.filter((pack) => pack.title.length === 0);
    if (invalidPackage.length > 0 || !(packages.length > 0))
      throw new Error("You should add atleast 1 price pack");
  },
  description: (desc: string) => {
    if (!(desc.length >= 100 && desc.length <= 500)) {
      throw new Error("Description should be 100 - 500 characters.");
    }
  },
  faq: (faq: ServiceType["faq"]) => {
    if (!(faq.length > 0)) {
      throw new Error("Atleast 1 faq is needed");
    }
  },
  images: (images: ServiceType["images"]) => {
    if (images.length === 0) throw new Error("Please upload atleast 1 image");
    if (images.length > 3) throw new Error("Maximum 3 images is allowed");
  },
};

const validate = [
  (data: ServiceType) => {
    validator.title(data.title);
    validator.category(data.category);
    validator.pricePackage(data.pricePackage);
  },
  (data: ServiceType) => {
    validator.description(data.description);
    validator.faq(data.faq);
  },
  (data: ServiceType) => {
    validator.images(data.images);
  },
];

const AddGig = () => {
  const [serviceData, setServiceData] =
    useState<ServiceType>(defaultServiceType);
  const [error, setError] = useState("");
  const toast = useToast();
  const { currentStepIndex, next, goto, prev, steps, step } = useMultiStepForm([
    <OverviewForm serviceData={serviceData} setServiceData={setServiceData} />,
    <DescriptionForm
      serviceData={serviceData}
      setServiceData={setServiceData}
    />,
    <GalleryForm serviceData={serviceData} setServiceData={setServiceData} />,
    <PublishGigs />,
  ]);
  const { publish, isLoading, setLoading } = useAddGigs();
  const [success, setSuccess] = useState(false);

  const onProgress = () => {
    try {
      if (validate[currentStepIndex]) {
        validate[currentStepIndex](serviceData);
      }
      next();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const onPublish = async () => {
    try {
      const res = await publish(serviceData);
      if (res?.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      if ((error as AxiosError<ErrorData>).response) {
        setError(
          (error as AxiosError<ErrorData>).response?.data.message as string
        );
      } else {
        // If backend crash / not found
        setError((error as AxiosError<ErrorData>).message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      if (error) {
        toast({
          title: `${error}`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    }
    setError("");
  }, [error]);
  return (
    <div>
      <GigsAddSuccessOverlay isOpen={success} />
      <AddGigsBreadcrump currentIndex={currentStepIndex} goto={goto} />
      {step}
      <div className="max-w-[85%] mx-auto my-4 flex gap-4 justify-end">
        {currentStepIndex === 0 ? (
          ""
        ) : (
          <Button variant="base" className="w-[6rem]" onClick={prev}>
            Back
          </Button>
        )}
        {currentStepIndex !== steps.length - 1 ? (
          <Button variant="base" className="w-[6rem]" onClick={onProgress}>
            Continue
          </Button>
        ) : (
          <Button
            variant="base"
            className="w-[6rem]"
            isLoading={isLoading}
            onClick={() => void onPublish()}
          >
            Publish
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddGig;
