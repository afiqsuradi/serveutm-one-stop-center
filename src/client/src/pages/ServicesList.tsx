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
  return (
    <>
      <div className="py-4 relative">
        <div className="container">
          <ServicesSearchBar />
        </div>
        <svg
          className="fill-primary rotate-180 absolute top-0 z-[-1] h-[6rem] md:h-auto "
          viewBox="0 0 1440 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0L26.7,15C53.3,30,107,60,160,61.7C213.3,63,267,37,320,26.7C373.3,17,427,23,480,30C533.3,37,587,43,640,53.3C693.3,63,747,77,800,73.3C853.3,70,907,50,960,36.7C1013.3,23,1067,17,1120,18.3C1173.3,20,1227,30,1280,40C1333.3,50,1387,60,1440,55C1493.3,50,1547,30,1600,25C1653.3,20,1707,30,1760,43.3C1813.3,57,1867,73,1920,80C1973.3,87,2027,83,2080,75C2133.3,67,2187,53,2240,41.7C2293.3,30,2347,20,2400,23.3C2453.3,27,2507,43,2560,46.7C2613.3,50,2667,40,2720,45C2773.3,50,2827,70,2880,65C2933.3,60,2987,30,3040,21.7C3093.3,13,3147,27,3200,33.3C3253.3,40,3307,40,3360,38.3C3413.3,37,3467,33,3520,40C3573.3,47,3627,63,3680,66.7C3733.3,70,3787,60,3813,55L3840,50L3840,100L3813.3,100C3786.7,100,3733,100,3680,100C3626.7,100,3573,100,3520,100C3466.7,100,3413,100,3360,100C3306.7,100,3253,100,3200,100C3146.7,100,3093,100,3040,100C2986.7,100,2933,100,2880,100C2826.7,100,2773,100,2720,100C2666.7,100,2613,100,2560,100C2506.7,100,2453,100,2400,100C2346.7,100,2293,100,2240,100C2186.7,100,2133,100,2080,100C2026.7,100,1973,100,1920,100C1866.7,100,1813,100,1760,100C1706.7,100,1653,100,1600,100C1546.7,100,1493,100,1440,100C1386.7,100,1333,100,1280,100C1226.7,100,1173,100,1120,100C1066.7,100,1013,100,960,100C906.7,100,853,100,800,100C746.7,100,693,100,640,100C586.7,100,533,100,480,100C426.7,100,373,100,320,100C266.7,100,213,100,160,100C106.7,100,53,100,27,100L0,100Z"></path>
        </svg>
      </div>
      <div className="container space-y-6 py-12">
        {error && (
          <Alert className="text-start" variant={"destructive"}>
            <FaExclamation />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="space-y-4 border p-6 rounded-md">
            {isLoading ? (
              ""
            ) : (
              <h1 className="text-xl font-semibold">
                {filters.type &&
                filters.type.length > 0 &&
                filters.textInput &&
                filters.textInput.length > 0
                  ? `Result for ${filters.textInput}`
                  : "Recently Added"}
              </h1>
            )}
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
        )}
      </div>
    </>
  );
};

export default ServicesList;
