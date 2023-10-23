import RegisterFormWrapper from "@/components/Service_Provider/Register/RegisterFormWrapper";
import { Input } from "@/components/ui/input";
import { useGig } from "@/hooks/Gigs/useGig";
import { GigTitleRule } from "@/types/GigRule";
import React from "react";
import { useState } from "react";
import { ZodError } from "zod";

const TitleForm = () => {
  const { service, setService } = useGig();
  const [error, setError] = useState("");
  const [length, setLength] = useState(service ? service.title.length : 0);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError("");
      setLength(event.target.value.length);
      setService((prev) => {
        return { ...prev, title: event.target.value };
      });
      GigTitleRule.parse(event.target.value);
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      }
    }
  };

  return (
    <RegisterFormWrapper key={"title"} title={"Title"}>
      <div className="relative">
        <Input
          type="text"
          className="text-base indent-9"
          onChange={onTitleChange}
          defaultValue={service.title}
        />
        <span className="absolute left-[0.8rem] top-1/2 -translate-y-1/2 text-base text-foreground/60">
          I will
        </span>
      </div>
      <div className="flex justify-between py-2">
        <p className="text-destructive text-xs">{error}</p>
        <p className="text-xs text-foreground/70 justify-self-end">
          {length}/70
        </p>
      </div>
    </RegisterFormWrapper>
  );
};

export default TitleForm;
