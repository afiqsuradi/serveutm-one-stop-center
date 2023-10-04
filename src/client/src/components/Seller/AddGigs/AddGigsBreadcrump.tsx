import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { BiSolidChevronRight } from "react-icons/bi";
const AddGigsBreadcrump = ({ currentIndex }: { currentIndex: number }) => {
  const processes = ["Overview", "Description & Faq", "Gallery", "Publish"];
  return (
    <Breadcrumb
      spacing="8px"
      separator={<BiSolidChevronRight className="text-gray-500" />}
      className="md:max-w-[95%] mx-auto py-4"
    >
      {processes.map((process, i) => (
        <BreadcrumbItem
          key={i}
          className="my-2 data-[active=true]:text-green-600"
          data-active={i === currentIndex || i < currentIndex}
        >
          <span
            className={`bg-[#2D3748] rounded-full w-6 text-center font-extrabold text-white mx-1 data-[active=true]:bg-green-600`}
            data-active={i === currentIndex || i < currentIndex}
          >
            {i + 1}
          </span>
          <BreadcrumbLink href="#">{process}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default AddGigsBreadcrump;
