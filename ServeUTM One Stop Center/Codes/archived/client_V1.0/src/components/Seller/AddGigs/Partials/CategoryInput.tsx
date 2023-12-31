import { Select } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import {
  GigsTypeOption,
  ServiceType,
} from "../../../../hooks/Services/useService";

interface Props {
  serviceData: ServiceType | undefined;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const categorySchema = z.enum(GigsTypeOption);

const CategoryInput = ({ serviceData, setServiceData }: Props) => {
  const [error, setError] = useState("");
  const descEl = useRef<HTMLSelectElement>(null);

  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const category = event.target.value;
      if (categorySchema.parse(category) === category) {
        setError("");
        setServiceData((prev) => {
          return { ...prev, category: category };
        });
      }
    } catch (_) {
      setError("Please select a category");
    }
  };

  useEffect(() => {
    if (serviceData && descEl.current) {
      descEl.current.value = serviceData.category;
    }
  }, [serviceData]);

  return (
    <div>
      <Select
        ref={descEl}
        defaultValue={serviceData ? serviceData.category : ""}
        placeholder="Select Category"
        onChange={onCategoryChange}
      >
        {GigsTypeOption.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
      <span className="text-red-300 text-sm">{error}</span>
    </div>
  );
};

export default CategoryInput;
