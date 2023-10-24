import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineSearch } from "react-icons/ai";
import { ServicesFilterType, ServicesSearchTypes } from "@/interface/Service";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "@/constant/routes";
import { Button } from "../ui/button";

type SearchFilterType = {
  textInput: ServicesFilterType["textInput"];
  type: ServicesFilterType["type"];
};

const ServicesSearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchEl = useRef<HTMLInputElement>(null);
  const search = new URLSearchParams(location.search).get("search") || "";
  const type = new URLSearchParams(location.search).get("type") || "";
  const [searchFilter, setSearchFilter] = useState<SearchFilterType>({
    textInput: "",
    type: "title",
  });
  const debounceValue = useDebounce<string | undefined>(searchFilter.textInput);

  const onTypeChange = (typeVal: string) => {
    const filteredType = ServicesSearchTypes.reduce((acc, curr) => {
      if (acc) {
        return acc;
      } else {
        return curr === typeVal ? (acc = typeVal) : (acc = "");
      }
    });
    setSearchFilter((prev) => {
      return { ...prev, type: filteredType };
    });
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter({ ...searchFilter, textInput: event.target.value });
  };

  const onReset = () => {
    setSearchFilter({ ...searchFilter, textInput: "" });
    if (searchEl.current) {
      searchEl.current.value = "";
    }
    navigate(ROUTES.VIEW_SERVICES, {
      replace: true,
    });
  };

  useEffect(() => {
    if (
      searchFilter.textInput &&
      searchFilter.textInput.length > 0 &&
      searchFilter.type &&
      searchFilter.type.length > 0 &&
      debounceValue
    ) {
      const newSearch = {
        search: debounceValue,
        type: searchFilter.type,
      };
      const param = Object.entries(newSearch)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      navigate(`${ROUTES.VIEW_SERVICES}?${param}`, {
        replace: true,
      });
    }
  }, [debounceValue]);

  return (
    <div className="flex gap-2">
      <Select defaultValue={type || "title"} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder="Title" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ServicesSearchTypes.map((type) => {
              if (type.length > 0) {
                return (
                  <SelectItem key={type} value={type}>
                    {type[0].toUpperCase() + type.substring(1, type.length)}
                  </SelectItem>
                );
              }
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="w-full relative">
        <Input
          type="text"
          placeholder="What service are you looking for?"
          className="indent-8"
          defaultValue={search || ""}
          onChange={onSearchChange}
          ref={searchEl}
        />
        <AiOutlineSearch className="text-lg absolute top-1/2 -translate-y-1/2 left-4" />
      </div>
      <Button variant={"destructive"} className="w-[6rem]" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

export default ServicesSearchBar;
