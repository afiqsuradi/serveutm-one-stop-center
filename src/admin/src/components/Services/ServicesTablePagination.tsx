import { ServicesFilterType } from "../../hooks/Services/useServices";

interface Props {
  count: number;
  setFilters: React.Dispatch<React.SetStateAction<ServicesFilterType>>;
  limit: number;
  page: number;
}
const ServicesTablePagination = ({ count, setFilters, limit, page }: Props) => {
  const pages = Math.ceil(count / limit);

  return (
    <>
      <div className="flex justify-end items-center gap-4">
        <label>Limit: </label>
        <select
          className="select select-bordered join-item w-28 bg-slate-200 text-black dark:bg-[#1D232A] dark:text-white"
          onChange={(event) => {
            const val = event.currentTarget.value;
            setFilters((prev) => {
              return { ...prev, limit: Number(val), page: 1 };
            });
          }}
          required
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="join mx-auto">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            className={`join-item btn ${i === page - 1 ? "btn-active" : ""}`}
            onClick={() => {
              setFilters((prev) => {
                return { ...prev, page: i + 1 };
              });
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ServicesTablePagination;
