import AddGigBreadcrump from "@/components/Gigs/AddGig/AddGigBreadcrump";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import Overview from "../../components/Gigs/AddGig/Forms/Overview";
import { ServiceProvider } from "@/context/gigProvider";
import { Button } from "@/components/ui/button";
import { useGig } from "@/hooks/Gigs/useGig";
import { ServiceType } from "@/interface/Service";
import { GigTitleRule } from "@/types/GigRule";
import { useState } from "react";
import { ZodError } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";

const validator = {
  title: (title: string) => {
    GigTitleRule.parse(title);
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
  const [error, setError] = useState("");
  const { service } = useGig();
  const { currentStepIndex, next, goto, prev, steps, step } = useMultiStepForm([
    <Overview />,
  ]);

  const onNext = () => {
    try {
      setError("");
      validate[currentStepIndex](service);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return setError(error.issues[0].message);
      }
      if (error instanceof Error) {
        return setError(error.message);
      }
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <AddGigBreadcrump currentIndex={currentStepIndex} goto={goto} />
      {error && (
        <Alert className="text-start" variant={"destructive"}>
          <FaExclamation />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="my-6 border p-8">{step}</div>
      <div className="flex">
        <Button onClick={onNext} className="w-[6rem] ml-auto">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AddGig;
