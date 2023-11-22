import { Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ZodError, z } from "zod";
import { ServiceType } from "../../../../hooks/Services/useService";

const titleSchema = z
  .string()
  .min(10, "Title should be 10 - 70 characters.")
  .max(70, "Title should be 10 - 70 characters.");

interface Props {
  serviceData: ServiceType | undefined;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const TitleInput = ({ serviceData, setServiceData }: Props) => {
  const title = useRef<HTMLInputElement>(null);
  const [titleCount, setTitleCount] = useState(0);
  const [error, setError] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.value) {
      setTitleCount(() => {
        return event.target.value.length;
      });
      try {
        if (titleSchema.parse(event.target.value) === event.target.value) {
          if (error.length > 0) {
            setError("");
          }
        }
      } catch (err) {
        setError((err as ZodError).errors[0].message);
      }
    }
  };

  const handleTitleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (error.length > 0) return;
    setServiceData((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  useEffect(() => {
    if (serviceData && serviceData.title.length > 0) {
      setTitleCount(serviceData.title.length);
    }
  }, [serviceData]);

  return (
    <div className="relative">
      <Input
        defaultValue={serviceData ? serviceData.title : ""}
        ref={title}
        placeholder=""
        className="pl-[2rem] indent-9"
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
      />
      <span className="absolute top-2 left-4 text-gray-300">I will</span>
      <div className="grid grid-cols-[3fr_1fr] text-sm text-gray-400 my-1">
        <span className="text-red-400">{error}</span>
        <span className="place-self-end">{titleCount}/70</span>
      </div>
    </div>
  );
};

export default TitleInput;
