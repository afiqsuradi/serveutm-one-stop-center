import AddGigBreadcrump from "@/components/Gigs/AddGig/AddGigBreadcrump";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import Overview from "../../components/Gigs/AddGig/Forms/Overview";
import { Button } from "@/components/ui/button";
import { useGig } from "@/hooks/Gigs/useGig";
import { useState } from "react";
import { ZodError } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import Description from "@/components/Gigs/AddGig/Forms/Description";
import { validate } from "./utils/validator";

const AddGig = () => {
  const [error, setError] = useState("");
  const { service } = useGig();
  const { currentStepIndex, next, goto, prev, steps, step } = useMultiStepForm([
    <Overview />,
    <Description />,
  ]);

  const onGoto = (index: number) => {
    try {
      setError("");
      if (index > currentStepIndex) {
        for (let i = currentStepIndex; i < index; i++) {
          validate[i](service);
        }
        goto(index);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return setError(error.issues[0].message);
      }
      if (error instanceof Error) {
        return setError(error.message);
      }
    }
  };

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

  const onPrev = () => {
    prev();
  };

  return (
    <div className="container py-6 space-y-6">
      <AddGigBreadcrump currentIndex={currentStepIndex} goto={onGoto} />
      {error && (
        <Alert className="text-start" variant={"destructive"}>
          <FaExclamation />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="my-6 border p-8">{step}</div>
      <div className="flex">
        <div className="ml-auto space-x-6">
          {currentStepIndex > 0 && (
            <Button className="w-[6rem]" onClick={onPrev}>
              Back
            </Button>
          )}
          <Button onClick={onNext} className="w-[6rem]">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddGig;
