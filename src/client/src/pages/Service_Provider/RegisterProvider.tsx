import Description from "@/components/Service_Provider/Register/Description";
import Languages from "@/components/Service_Provider/Register/Languages";
import PersonalWebsite from "@/components/Service_Provider/Register/PersonalWebsite";
import Skills from "@/components/Service_Provider/Register/Skills";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import useRegisterProvider from "@/hooks/Service_Provider/useRegisterProvider";
import { ProviderInfo, defaultProfileValue } from "@/interface/Provider";
import { FaExclamation } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/constant/routes";
import {
  linkRule,
  providerDescriptionRule,
} from "@/types/providerInfoDataRule";
import { ZodError } from "zod";
import { useAuth } from "@/hooks/Auth/useAuth";

const RegisterProvider = () => {
  const { Auth } = useAuth();
  const { register, success, isLoading, error: err } = useRegisterProvider();
  const [error, setError] = useState(err);
  const navigate = useNavigate();
  const [providerInfo, setProviderInfo] =
    useState<ProviderInfo>(defaultProfileValue);

  const onProfileClose = () => {
    navigate(ROUTES.USER_PROFILE);
  };

  const onRegister = () => {
    try {
      setError("");
      providerDescriptionRule.parse(providerInfo.description);
      if (
        providerInfo.PersonalWebsite &&
        providerInfo.PersonalWebsite.length > 0
      ) {
        linkRule.parse(providerInfo.PersonalWebsite);
      }
      if (!(providerInfo.skills.length > 0))
        throw Error("Atleast 1 skill required");
      if (!(providerInfo.language.length > 0))
        throw Error("Atleast 1 language required");
      register(providerInfo);
    } catch (regErr) {
      if (regErr instanceof ZodError) {
        setError(regErr.issues[0].message);
      } else {
        setError((regErr as Error).message);
      }
    }
  };
  useEffect(() => {
    setError(err);
  }, [err]);
  useEffect(() => {
    const skills = providerInfo.skills.filter((skill) => skill.name.length > 0);
    const language = providerInfo.language.filter(
      (lang) => lang.name.length > 0
    );
    setProviderInfo((prev) => {
      return { ...prev, skills, language };
    });
  }, []);

  if (!Auth.isVerified) {
    navigate(ROUTES.USER_PROFILE);
  }

  return (
    <div className="py-12">
      <AlertDialog open={success} onOpenChange={onProfileClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Updated Profile</AlertDialogTitle>
            <AlertDialogDescription>
              You have been successfully registered as service provider.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="container">
        <div className="p-6 border space-y-12">
          <div>
            <h1 className="text-2xl font-semibold">Professional Info</h1>
            <p>
              Tell us a bit about yourself. This information will appear on your
              public profile, so that potential buyers can get to know you
              better.
            </p>
          </div>
          {error ? (
            <Alert className="text-start" variant={"destructive"}>
              <FaExclamation />
              <AlertTitle>Register Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            ""
          )}
          <div className="grid md:grid-cols-2 md:justify-between md:gap-12">
            <Description
              value={providerInfo.description}
              setProviderInfo={setProviderInfo}
            />
            <Skills
              skills={providerInfo.skills}
              setProviderInfo={setProviderInfo}
            />
            <Languages
              languages={providerInfo.language}
              setProviderInfo={setProviderInfo}
            />
            <PersonalWebsite
              setProviderInfo={setProviderInfo}
              link={providerInfo.PersonalWebsite}
            />
            <Button
              onClick={onRegister}
              className="w-[147px] md:col-start-2 place-self-end"
              disabled={isLoading || success}
            >
              {isLoading ? <Spinner /> : "Register"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;
