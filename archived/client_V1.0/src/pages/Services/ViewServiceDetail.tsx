import { useParams } from "react-router-dom";
import useService from "../../hooks/Services/useService";
import FaqDisclosure from "../../components/Seller/Partials/FaqDisclosure";
import PricePackageCard from "../../components/Seller/Partials/PricePackageCard";
import { Divider } from "@chakra-ui/react";
import AboutOwner from "../../components/Seller/Partials/AboutOwner";
import ServiceImageCarousel from "../../components/Seller/Partials/ServiceImageCarousel";

const ViewServiceDetail = () => {
  const { id } = useParams();
  const { data } = useService(id ? id : "");
  if (!data) return;
  return (
    <div className="flex md:flex-row flex-wrap gap-14 p-8 justify-between w-full max-w-[80%] mx-auto">
      <div>
        <div className="mb-4">
          <h1 className="text-2xl text-black dark:text-white">
            I will {data.title}{" "}
          </h1>
          <p>{data.category}</p>
        </div>
        <ServiceImageCarousel images={data.images} />
        <Divider className="my-6" />
        {data.owner ? <AboutOwner userdata={data.owner} /> : ""}

        <div className="max-w-2xl mt-6">
          <h2 className="text-xl underline">Description</h2>
          <p className="my-2">{data.description}</p>
        </div>
        <div className="pt-10">
          <h2 className="text-xl underline ">
            Frequently Asked Question (FAQs)
          </h2>
          <FaqDisclosure faqs={data.faq} />
        </div>
      </div>
      <PricePackageCard pricePackages={data.pricePackage} />
    </div>
  );
};

export default ViewServiceDetail;
