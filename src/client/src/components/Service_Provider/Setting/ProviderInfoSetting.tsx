import Description from "@/components/Service_Provider/Register/Description";
import Languages from "@/components/Service_Provider/Register/Languages";
import PersonalWebsite from "@/components/Service_Provider/Register/PersonalWebsite";
import Skills from "@/components/Service_Provider/Register/Skills";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { ProviderInfo } from "@/interface/Provider";
import { FaExclamation } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import {
  linkRule,
  providerDescriptionRule,
} from "@/types/providerInfoDataRule";
import { ZodError } from "zod";
import useUpdateProfile from "@/hooks/Service_Provider/useUpdateProfile";

interface Props {
  initialValue: ProviderInfo;
}

const ProviderInfoSetting = ({ initialValue }: Props) => {
  const { update, isLoading, error: err } = useUpdateProfile();
  const [error, setError] = useState("");
  const [providerInfo, setProviderInfo] = useState<ProviderInfo>(initialValue);

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
      update(providerInfo);
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

  return (
    <div className="p-6 border space-y-12">
      <div>
        <h1 className="text-2xl font-semibold">Profile Settings</h1>
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
      <div className="grid lg:grid-cols-2 lg:justify-between lg:gap-12">
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
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default ProviderInfoSetting;
