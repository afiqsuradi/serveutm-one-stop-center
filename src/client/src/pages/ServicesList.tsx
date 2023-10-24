import ServiceCard from "@/components/Gigs/ServiceCard";
import Spinner from "@/components/ui/spinner";
import useServices from "@/hooks/Gigs/useServices";
import {
  ServiceType,
  ServicesFilterType,
  ServicesSearchTypes,
} from "@/interface/Service";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import ServicesNotFound from "@/components/Services/ServicesNotFound";
import { useLocation } from "react-router-dom";
import ServicesPagination from "@/components/Services/ServicesPagination";
import ServicesSearchBar from "@/components/Services/ServicesSearchBar";

const ServicesList = () => {
  const location = useLocation();
  const [services, setServices] = useState<ServiceType[] | null>(null);
  const [filters, setFilters] = useState<ServicesFilterType>({ limit: 5 });
  const search = new URLSearchParams(location.search).get("search") || "";
  const type = new URLSearchParams(location.search).get("type") || "";
  const { data, isLoading, error } = useServices(filters);

  useEffect(() => {
    if (search) {
      setFilters((prev) => {
        return { ...prev, textInput: search };
      });
      if (type && type.length > 0) {
        const filteredType = ServicesSearchTypes.reduce((acc, curr) => {
          if (acc) {
            return acc;
          } else {
            return curr === type ? (acc = type) : (acc = "");
          }
        });
        setFilters((prev) => {
          return { ...prev, type: filteredType };
        });
      }
    } else {
      setFilters({ ...filters, textInput: "", type: "" });
    }
  }, [search, type, location.search]);

  useEffect(() => {
    if (data) {
      setServices(data.services);
    }
  }, [data]);
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="py-4 border-b">
        <div className="container">
          <ServicesSearchBar />
        </div>
      </div>
      <div className="container space-y-6 py-12">
        {error && (
          <Alert className="text-start" variant={"destructive"}>
            <FaExclamation />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-4 border p-6">
          <h1 className="text-xl font-semibold">
            {filters.type &&
            filters.type.length > 0 &&
            filters.textInput &&
            filters.textInput.length > 0
              ? `Result for ${filters.textInput}`
              : "Recently Added"}
          </h1>
          <div className="flex gap-6 flex-wrap">
            {services &&
              services.map((service) => {
                return (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    isOwner={false}
                    variant="secondary"
                  />
                );
              })}
            {services && data && data.count === 0 && <ServicesNotFound />}
          </div>
          <ServicesPagination
            count={data?.count || 0}
            setFilters={setFilters}
            limit={filters.limit}
            page={filters.page || 1}
          />
        </div>
      </div>
    </>
  );
};

export default ServicesList;
