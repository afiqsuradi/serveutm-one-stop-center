import { BsSearch } from "react-icons/bs";
import { useRef } from "react";
import {
  InquiryFilterOption,
  InquiryFilterType,
} from "../../hooks/Inquiries/useInquiries";

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<InquiryFilterType>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const InquiriesSearchBar = ({ setFilters, setError }: Props) => {
  const textInput = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLSelectElement>(null);
  return (
    <div className="join w-full">
      <div className="flex-1">
        <div className="relative">
          <input
            ref={textInput}
            className="input input-bordered join-item w-full pl-8 bg-slate-200 text-black dark:bg-[#1D232A] dark:text-white"
            placeholder="Search"
            required
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (textInput.current && type.current) {
                  const textVal = textInput.current.value;
                  const typeVal = type.current.value;
                  if (textVal.length === 0)
                    return setError(
                      "Please fill the search bar and type selection"
                    );
                  if (!(typeVal === "email" || typeVal === "name"))
                    return setError(
                      "Please fill the search bar and type selection"
                    );
                  setFilters((prev) => {
                    return { ...prev, textInput: textVal, type: typeVal };
                  });
                }
              }
            }}
          />
          <BsSearch className="absolute text-md top-[50%] translate-y-[-50%] left-3" />
        </div>
      </div>
      <select
        ref={type}
        className="select select-bordered join-item bg-slate-200 text-black dark:bg-[#1D232A] dark:text-white"
        required
      >
        <option disabled selected value={undefined}>
          Filter By
        </option>
        {InquiryFilterOption.map((opt) => (
          <option key={opt} value={opt}>
            {opt[0].toUpperCase() + opt.substring(1, opt.length)}
          </option>
        ))}
      </select>
      <div className="indicator">
        <button
          className="btn btn-secondary join-item"
          type="button"
          onClick={() => setFilters({ limit: 5 })}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default InquiriesSearchBar;
