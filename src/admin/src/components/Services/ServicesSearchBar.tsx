import { BsSearch } from "react-icons/bs";
import {
  ServicesFilterType,
  ServicesSearchTypes,
} from "../../hooks/Services/useServices";
import { useRef } from "react";

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<ServicesFilterType>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const ServicesSearchBar = ({ setFilters, setError }: Props) => {
  const textInput = useRef<HTMLInputElement>(null);
  const status = useRef<HTMLSelectElement>(null);
  const type = useRef<HTMLSelectElement>(null);

  const isValidType = (typeInput: string) => {
    return ServicesSearchTypes.reduce((acc, curr) => {
      if (acc) return true;
      return curr === typeInput;
    }, false);
  };

  const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (textInput.current && type.current) {
        const textVal = textInput.current.value;
        const typeVal = type.current.value;
        const newType = isValidType(typeVal)
          ? (typeVal as (typeof ServicesSearchTypes)[number])
          : undefined;
        console.log(newType, typeVal);
        if (textVal.length === 0 || !newType)
          return setError("Please fill the search bar and type selection");
        setFilters((prev) => {
          return { ...prev, textInput: textVal, type: newType };
        });
      }
    }
  };

  const onReset = () => {
    const textEl = textInput.current;
    const typeEl = type.current;
    const statusEl = status.current;
    if (textEl && typeEl && statusEl) {
      textEl.value = typeEl.value = statusEl.value = "";
    }
    setFilters({ limit: 5 });
  };

  const onSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => {
      return { ...prev, gigStatus: event.target.value };
    });
  };

  return (
    <div className="join w-full">
      <div className="flex-1">
        <div className="relative">
          <input
            ref={textInput}
            className="input input-bordered join-item w-full pl-8 bg-slate-200 text-black dark:bg-[#1D232A] dark:text-white"
            placeholder="Search"
            onKeyDown={onSearch}
            required
          />
          <BsSearch className="absolute text-md top-[50%] translate-y-[-50%] left-3" />
        </div>
      </div>
      <select
        className="select select-bordered join-item bg-slate-200 text-black dark:bg-[#1D232A] dark:text-white md:w-[12rem]"
        ref={type}
        required
      >
        <option selected value={""}>
          Filter By
        </option>
        {ServicesSearchTypes.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt[0].toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
      <select
        className="select select-bordered join-item bg-slate-200 text-black dark:bg-[#1D232A] dark:text-white md:w-[12rem]"
        ref={status}
        onChange={onSelectStatus}
      >
        <option disabled selected value={""}>
          Gigs Status
        </option>
        <option value={"Rejected"}>Rejected</option>
        <option value={"Pending"}>Pending Approval</option>
        <option value={"Approved"}>Approved</option>
      </select>
      <div className="indicator">
        <button
          className="btn btn-secondary join-item w-[5rem]"
          type="button"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ServicesSearchBar;
