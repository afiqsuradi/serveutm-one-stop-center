import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Description from "@/components/Gigs/AddGig/Forms/Description";
import Overview from "@/components/Gigs/AddGig/Forms/Overview";
import Gallery from "@/components/Gigs/AddGig/Forms/Gallery/Gallery";
import { FaExclamation } from "react-icons/fa";
import Spinner from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { ZodError } from "zod";
import useUpdateGig from "@/hooks/Gigs/useUpdateGig";
import { useAuth } from "@/hooks/Auth/useAuth";
import { ServiceType } from "@/interface/Service";
import { useGig } from "@/hooks/Gigs/useGig";
import { validate } from "@/pages/Gigs/utils/validator";

interface Props {
  id: string;
  data: ServiceType;
}

const GigEditor = ({ id, data }: Props) => {
  const { service, setService } = useGig();
  const { Auth } = useAuth();
  const {
    update,
    isLoading,
    error: updateErr,
  } = useUpdateGig({
    id: id ? id : "",
    username: Auth.username,
  });
  const [error, setError] = useState("");
  const processes = ["Overview", "Description & Faq", "Gallery"];
  const steps = [<Overview />, <Description />, <Gallery />];

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
    setService(() => data);
  }, []);
  return (
    <>
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
    </>
  );
};

export default GigEditor;
