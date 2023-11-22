import RegisterFormWrapper from "@/components/Service_Provider/Register/RegisterFormWrapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGig } from "@/hooks/Gigs/useGig";
import { GigsTypeOption } from "@/interface/Service";
import { GigCategoryRule } from "@/types/GigRule";
import { useState } from "react";

const CategoryForm = () => {
  const { service, setService } = useGig();
  const [error, setError] = useState("");

  const onCategoryChange = (data: string) => {
    try {
      setError("");
      const category = GigCategoryRule.parse(data);
      setService((prev) => {
        return { ...prev, category };
      });
    } catch (error) {
      setError("Please Select Atleast 1 Category");
    }
  };

  return (
    <RegisterFormWrapper title={"Category"}>
      <Select
        defaultValue={
          service && service.category.length > 0 ? service.category : undefined
        }
        onValueChange={onCategoryChange}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select Gig Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {GigsTypeOption.map((type) => {
              return (
                <SelectItem value={type} key={type}>
                  {type}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-destructive text-xs">{error}</p>
    </RegisterFormWrapper>
  );
};

export default CategoryForm;
