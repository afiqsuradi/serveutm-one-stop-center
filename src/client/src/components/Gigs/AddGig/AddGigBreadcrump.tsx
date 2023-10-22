import { FaChevronRight } from "react-icons/fa";
interface Props {
  currentIndex: number;
  goto: (index: number) => void;
}

const AddGigBreadcrump = ({ currentIndex, goto }: Props) => {
  const processes = ["Overview", "Description & Faq", "Gallery", "Publish"];
  return (
    <ol className="flex gap-2 items-center flex-wrap">
      {processes.map((process, idx) => {
        return (
          <>
            <li
              className="flex items-center"
              value={process}
              key={`${process}_${idx}`}
            >
              <span
                className="bg-secondary rounded-full w-6 text-center font-extrabold text-foreground mx-1 data-[active=true]:bg-success"
                data-active={idx === currentIndex || idx < currentIndex}
              >
                {idx + 1}
              </span>
              <a
                onClick={() => goto(idx)}
                className="text-foreground data-[active=true]:text-success hover:cursor-pointer hover:underline"
                data-active={idx === currentIndex || idx < currentIndex}
              >
                {process}
              </a>
            </li>
            {idx !== processes.length - 1 ? (
              <div className="mx-2" key={`${process}_0${idx}`}>
                <FaChevronRight className="text-xs text-foreground/70" />
              </div>
            ) : (
              ""
            )}
          </>
        );
      })}
    </ol>
  );
};

export default AddGigBreadcrump;
