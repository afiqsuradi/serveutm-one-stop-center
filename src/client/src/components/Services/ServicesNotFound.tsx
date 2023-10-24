import { RiMenuSearchLine } from "react-icons/ri";
const ServicesNotFound = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center py-12">
      <RiMenuSearchLine className="text-6xl text-foreground/60" />
      <h1 className="text-xl">No results found</h1>
      <h3 className="text-foreground/75">
        Try different or more general keywords
      </h3>
    </div>
  );
};

export default ServicesNotFound;
