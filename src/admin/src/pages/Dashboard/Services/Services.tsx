import { useState } from "react";
import ServicesSearchBar from "../../../components/Services/ServicesSearchBar";
import ServicesTable from "../../../components/Services/ServicesTable";
import useServices, {
  ServicesFilterType,
} from "../../../hooks/Services/useServices";
import ServicesTablePagination from "../../../components/Services/ServicesTablePagination";

const Services = () => {
  const [filters, setFilters] = useState<ServicesFilterType>({ limit: 5 });
  const { data, setError } = useServices(filters);
  if (!data) return;
  return (
    <div className="card bg-white max-w-full text-black dark:bg-[#1D283A] dark:text-white md:w-[90%] mx-auto my-8">
      <div className="card-body">
        <h2 className="card-title max-w-fit">List of services</h2>
        <ServicesSearchBar setFilters={setFilters} setError={setError} />
        <ServicesTable services={data?.services} />
        <ServicesTablePagination
          count={data.count}
          setFilters={setFilters}
          limit={filters.limit}
          page={filters.page || 1}
        />
      </div>
    </div>
  );
};

export default Services;
