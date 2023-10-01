import { useState } from "react";
import InquiriesSearchBar from "../../../components/Inquiries/InquiriesSearchBar";
import InquiriesTable from "../../../components/Inquiries/InquiriesTable";
import useInquiries, {
  InquiryFilterType,
} from "../../../hooks/Inquiries/useInquiries";
import InquiryTablePagination from "../../../components/Inquiries/InquiryTablePagination";

const Inquiries = () => {
  const [filters, setFilters] = useState<InquiryFilterType>({ limit: 5 });
  const { data, setError } = useInquiries(filters);
  if (!data) return "";
  return (
    <div className="card bg-white text-black dark:bg-[#1D283A] dark:text-white max-w-full md:w-[90%] mx-auto my-8">
      <div className="card-body">
        <h2 className="card-title">List Of Inquiry</h2>
        <InquiriesSearchBar setFilters={setFilters} setError={setError} />
        <InquiriesTable inquiries={data?.inquiries} />
        <InquiryTablePagination
          count={data.count}
          setFilters={setFilters}
          limit={filters.limit || 1}
          page={filters.page || 1}
        />
      </div>
    </div>
  );
};

export default Inquiries;
