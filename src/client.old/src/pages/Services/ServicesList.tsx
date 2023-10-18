import { Button, Heading } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import useServices, {
  ServicesFilterType,
  ServicesSearchTypes,
} from "../../hooks/Services/useServices";
import { useRef, useState } from "react";
import ServicePublicCard from "../../components/ServicePublicCard";

const filterType = (data: string) => {
  return ServicesSearchTypes.reduce((acc, curr) => {
    if (acc) {
      return acc;
    }
    return curr === data ? curr : acc;
  });
};

const ServicesList = () => {
  const [filters, setFilters] = useState<ServicesFilterType>({
    limit: 8,
  });
  const textInputEl = useRef<HTMLInputElement>(null);
  const typeEl = useRef<HTMLSelectElement>(null);
  const { data } = useServices(filters);

  const onFilterChange = () => {
    if (!textInputEl.current) return;
    if (!typeEl.current) return;
    const type = filterType(typeEl.current.value);
    const textInput = textInputEl.current.value;
    if (type.length > 0 && textInput.length > 0) {
      setFilters((prev) => {
        return { ...prev, type, textInput };
      });
    }
  };

  const onReset = () => {
    if (!textInputEl.current) return;
    if (!typeEl.current) return;
    textInputEl.current.value = "";
    typeEl.current.value = "";
    setFilters((prev) => {
      return { limit: prev.limit };
    });
  };

  const onNextPage = () => {
    if (!data) return;
    const currPage = filters.page ? filters.page : 1;
    const maxPage = Math.ceil(data.count / filters.limit);
    if (currPage + 1 > maxPage) return;
    setFilters((prev) => {
      return { ...prev, page: currPage + 1 };
    });
  };
  const onPrevPage = () => {
    if (!data) return;
    const currPage = filters.page ? filters.page : 1;
    if (currPage - 1 < 1) return;
    setFilters((prev) => {
      return { ...prev, page: currPage - 1 };
    });
  };

  return (
    <div className="bg-gray-200 flex flex-col">
      <div className="max-w-[80%] w-full mx-auto py-10">
        <Heading color={"black"} fontFamily={"poppins"}>
          Services
        </Heading>
      </div>
      <div className="max-w-[80%] w-full mx-auto px-4 rounded-lg bg-white text-black mb-8">
        <div className="my-4 grid grid-cols-[8fr_2fr_1fr] gap-2">
          <div className="relative min-w-full">
            <input
              ref={textInputEl}
              onChange={onFilterChange}
              className="w-full bg-white rounded-lg border-2 border-gray-500 p-2 indent-8 ring-0"
            />
            <BsSearch className="absolute top-[50%] translate-y-[-50%] left-4" />
          </div>
          <select
            ref={typeEl}
            onChange={onFilterChange}
            className="w-full bg-white rounded-lg border-2 border-gray-500 p-2 ring-0"
            defaultValue={""}
          >
            {ServicesSearchTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type.length > 0
                  ? type[0].toUpperCase() + type.slice(1, type.length)
                  : "Filter by"}
              </option>
            ))}
          </select>
          <Button colorScheme="pink" size="md" onClick={onReset}>
            Reset
          </Button>
        </div>
        <div className="grid sm:grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center p-8">
          {data
            ? data.services.map((service) => (
                <ServicePublicCard serviceData={service} />
              ))
            : ""}
        </div>

        <div className="flex flex-col items-center my-4">
          <span className="text-sm text-black">
            Showing <span className="font-semibold text-gray-900">1</span> to{" "}
            <span className="font-semibold text-gray-900 ">
              {filters.limit}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 ">
              {data ? data.count : ""}
            </span>{" "}
            Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={onNextPage}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Prev
            </button>
            <button
              onClick={onPrevPage}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
