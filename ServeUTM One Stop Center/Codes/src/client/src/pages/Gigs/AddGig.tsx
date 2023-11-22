import AddGigBreadcrump from "@/components/Gigs/AddGig/AddGigBreadcrump";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import Overview from "../../components/Gigs/AddGig/Forms/Overview";
import { Button } from "@/components/ui/button";
import { useGig } from "@/hooks/Gigs/useGig";
import { useEffect, useState } from "react";
import { ZodError } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import Description from "@/components/Gigs/AddGig/Forms/Description";
import { validate } from "./utils/validator";
import Gallery from "@/components/Gigs/AddGig/Forms/Gallery/Gallery";
import Publish from "@/components/Gigs/AddGig/Forms/Publish";
import useAddGig from "@/hooks/Gigs/useAddGig";
import Spinner from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ROUTES from "@/constant/routes";

const AddGig = () => {
  const navigate = useNavigate();
  const { publish, isLoading, error: publishErr, success } = useAddGig();
  const [error, setError] = useState("");
  const { service } = useGig();
  const { currentStepIndex, next, goto, prev, step, steps } = useMultiStepForm([
    <Overview />,
    <Description />,
    <Gallery />,
    <Publish />,
  ]);

  const onGoto = (index: number) => {
    try {
      setError("");
      if (index > currentStepIndex) {
        for (let i = currentStepIndex; i < index; i++) {
          validate[i](service);
        }
      }
      goto(index);
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

  const onPublish = () => {
    try {
      setError("");
      validate.forEach((val) => {
        val(service);
      });
      publish(service);
    } catch (error) {
      if (error instanceof ZodError) {
        return setError(error.issues[0].message);
      }
      if (error instanceof Error) {
        return setError(error.message);
      }
    }
  };

  const onProfileClose = () => {
    navigate(ROUTES.USER_PROFILE);
  };

  useEffect(() => {
    setError(publishErr);
  }, [publishErr]);

  return (
    <div className="container py-6 space-y-6">
      <AlertDialog open={success} onOpenChange={onProfileClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Added Gig</AlertDialogTitle>
            <AlertDialogDescription>
              Your gig have been successfully added. You may wait for 2 - 4
              working days for approval process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
          {currentStepIndex === steps.length - 1 ? (
            <Button
              className="w-[6rem]"
              disabled={isLoading}
              onClick={onPublish}
            >
              {isLoading ? <Spinner /> : "Publish"}
            </Button>
          ) : (
            <Button onClick={onNext} className="w-[6rem]">
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddGig;
