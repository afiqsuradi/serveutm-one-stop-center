import React, { useEffect, useState } from "react";
import { ServiceType } from "../../../../../hooks/Services/useServices";
import z, { ZodError } from "zod";

interface Props {
  serviceData: ServiceType;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const DescField = ({ setServiceData, serviceData }: Props) => {
  const schema = z.object({
    description: z
      .string()
      .min(100, "Description should be 100 - 500 characters.")
      .max(500, "Description should be 100 - 500 characters."),
  });
  const [descLength, setDescLength] = useState(0);
  const [error, setError] = useState("");

  const updateDescription = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (error.length > 0) return;
    setServiceData((prev) => {
      return { ...prev, description: event.target.value };
    });
  };

  const onDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      if (
        schema.parse({ description: event.currentTarget.value }).description ===
        event.currentTarget.value
      ) {
        if (error.length > 0) {
          setError("");
        }
      }
    } catch (error) {
      setError((error as ZodError).errors[0].message);
    }
  };

  useEffect(() => {
    if (serviceData.description && serviceData.description.length > 0) {
      setDescLength(serviceData.description.length);
    }
  }, []);
  return (
    <div className="w-full">
      <textarea
        className="resize-none bg-[#161F2C] rounded-lg w-full min-h-[8rem]"
        onBlur={updateDescription}
        defaultValue={serviceData.description}
        onChange={onDescChange}
      ></textarea>
      <div className="w-full flex justify-between">
        <p className="text-red-500">{error}</p>
        <span id="descLength" className="text-gray-400">
          {descLength}/500
        </span>
      </div>
    </div>
  );
};

export default DescField;
