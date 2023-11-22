import { Input } from "@/components/ui/input";
import RegisterFormWrapper from "./RegisterFormWrapper";
import { useState } from "react";
import { ProviderInfo } from "@/interface/Provider";
import { linkRule } from "@/types/providerInfoDataRule";
import { ZodError } from "zod";

interface Props {
  link: ProviderInfo["PersonalWebsite"];
  setProviderInfo: React.Dispatch<React.SetStateAction<ProviderInfo>>;
}

const PersonalWebsite = ({ link, setProviderInfo }: Props) => {
  const [error, setError] = useState("");

  const onChangeLink = (value: string) => {
    setError("");
    if (!(value.length > 0)) {
      return setProviderInfo((prev) => {
        return { ...prev, PersonalWebsite: "" };
      });
    }
    try {
      linkRule.parse(value);
      return setProviderInfo((prev) => {
        return { ...prev, PersonalWebsite: value };
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      }
    }
  };
  return (
    <RegisterFormWrapper title="Personal Website" key="PersonalWebsite">
      <Input
        placeholder="https://www.serveutm.online"
        name="PersonalWebsite"
        onChange={(e) => onChangeLink(e.target.value)}
        defaultValue={link}
      />
      <p className="text-destructive text-xs my-2">{error}</p>
    </RegisterFormWrapper>
  );
};

export default PersonalWebsite;
