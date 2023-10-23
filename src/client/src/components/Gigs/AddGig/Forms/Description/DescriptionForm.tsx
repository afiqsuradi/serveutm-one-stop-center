import RegisterFormWrapper from "@/components/Service_Provider/Register/RegisterFormWrapper";
import { Textarea } from "@/components/ui/textarea";
import { useGig } from "@/hooks/Gigs/useGig";
import { descriptionRule } from "@/types/GigRule";
import { useRef, useState } from "react";
import { ZodError } from "zod";

const DescriptionForm = () => {
  const { service, setService } = useGig();
  const [length, setLength] = useState(service.description.length);
  const [error, setError] = useState("");
  const descEl = useRef<HTMLTextAreaElement>(null);

  const onDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setError("");
      setLength(event.target.value.length);
      setService((prev) => {
        return { ...prev, description: event.target.value };
      });
      descriptionRule.parse(event.target.value);
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      }
    }
  };

  return (
    <RegisterFormWrapper title="Description">
      <Textarea
        className="resize-none"
        onChange={onDescChange}
        ref={descEl}
        defaultValue={service.description}
      />
      <div className="flex justify-between my-2">
        <p className="text-destructive text-xs">{error}</p>
        <p className="text-xs text-foreground/70 justify-self-end">
          {length}/700
        </p>
      </div>
    </RegisterFormWrapper>
  );
};

export default DescriptionForm;
