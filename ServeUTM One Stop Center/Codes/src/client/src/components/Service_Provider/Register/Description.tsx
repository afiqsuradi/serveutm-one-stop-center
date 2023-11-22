import { Textarea } from "@/components/ui/textarea";
import RegisterFormWrapper from "./RegisterFormWrapper";
import { useState } from "react";
import { ProviderInfo } from "@/interface/Provider";
import React from "react";
import { providerDescriptionRule } from "@/types/providerInfoDataRule";
import { ZodError } from "zod";

interface Props {
  value: ProviderInfo["description"];
  setProviderInfo: React.Dispatch<React.SetStateAction<ProviderInfo>>;
}

const Description = ({ value, setProviderInfo }: Props) => {
  const [length, setLength] = useState(value.length);
  const [error, setError] = useState("");
  const descLength = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLength(() => event.target.value.length);
    setDescription(event.target.value);
  };

  const setDescription = (value: string) => {
    try {
      setError("");
      providerDescriptionRule.parse(value);
      setProviderInfo((prev) => {
        return { ...prev, description: value };
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      }
    }
  };

  return (
    <RegisterFormWrapper title="Description" key="description">
      <Textarea
        onChange={descLength}
        onBlur={(event) => {
          setDescription(event.target.value);
        }}
        defaultValue={value}
        placeholder="Share a bit about your work experience, cool projects you've completed, and your area of expertise."
        className="m-0 resize-none"
      />
      <div className="flex justify-between py-2">
        <p className="text-destructive text-xs">{error}</p>
        <p className="text-xs text-foreground/70 justify-self-end">
          {length}/600
        </p>
      </div>
    </RegisterFormWrapper>
  );
};

export default Description;
