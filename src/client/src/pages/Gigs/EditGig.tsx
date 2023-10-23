import useService from "@/hooks/Gigs/useService";
import { useParams } from "react-router-dom";
import GigDetail from "./GigDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Description from "@/components/Gigs/AddGig/Forms/Description";
import Overview from "@/components/Gigs/AddGig/Forms/Overview";
import Gallery from "@/components/Gigs/AddGig/Forms/Gallery/Gallery";
import { useEffect, useState } from "react";
import { useGig } from "@/hooks/Gigs/useGig";
import { Button } from "@/components/ui/button";
import { validate } from "./utils/validator";
import { ZodError } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import useUpdateGig from "@/hooks/Gigs/useUpdateGig";
import { useAuth } from "@/hooks/Auth/useAuth";
import Spinner from "@/components/ui/spinner";

const EditGig = () => {
  const { Auth } = useAuth();
  const { service, setService } = useGig();
  const [error, setError] = useState("");
  const processes = ["Overview", "Description & Faq", "Gallery"];
  const steps = [<Overview />, <Description />, <Gallery />];
  const { id } = useParams();
  const { data } = useService(id ? id : "");
  const {
    update,
    isLoading,
    error: updateErr,
  } = useUpdateGig({
    id: id ? id : "",
    username: Auth.username,
  });

  const onUpdate = () => {
    try {
      setError("");
      validate.forEach((val) => {
        val(service);
      });
      update(service);
    } catch (error) {
      if (error instanceof ZodError) {
        return setError(error.issues[0].message);
      }
      if (error instanceof Error) {
        return setError(error.message);
      }
    }
  };

  useEffect(() => {
    setError(updateErr);
  }, [updateErr]);

  useEffect(() => {
    if (data) {
      setService(data);
    }
  }, [data]);
  if (!data) return;
  return (
    <>
      <GigDetail />
      <div className="container mb-6 flex flex-col">
        <Separator className="my-6" />
        <Tabs defaultValue="0" className="w-full">
          <TabsList className={`grid w-full grid-cols-${processes.length}`}>
            {processes.map((process, idx) => {
              return <TabsTrigger value={`${idx}`}>{process}</TabsTrigger>;
            })}
          </TabsList>
          {error && (
            <div className="my-4">
              <Alert className="text-start" variant={"destructive"}>
                <FaExclamation />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
          {steps.map((element, idx) => {
            return (
              <TabsContent value={`${idx}`} className="border p-6 rounded-md">
                {element}
              </TabsContent>
            );
          })}
        </Tabs>
        <Button
          className="w-[6rem] ml-auto my-6"
          onClick={onUpdate}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Update"}
        </Button>
      </div>
    </>
  );
};

export default EditGig;
