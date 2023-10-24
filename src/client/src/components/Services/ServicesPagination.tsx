import { ServicesFilterType } from "@/interface/Service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

interface Props {
  count: number;
  setFilters: React.Dispatch<React.SetStateAction<ServicesFilterType>>;
  limit: number;
  page: number;
}

const ServicesPagination = ({ count, setFilters, limit, page }: Props) => {
  const pages = Math.ceil(count / limit);
  return (
    <>
      <div className="flex justify-end items-center gap-4">
        <h4>Limit: </h4>
        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Card limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center">
        {Array.from({ length: pages }, (_, i) => (
          <Button
            key={i}
            variant={`${i === page - 1 ? "outline" : "default"}`}
            className={"w-10"}
            onClick={() => {
              setFilters((prev) => {
                return { ...prev, page: i + 1 };
              });
            }}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default ServicesPagination;
