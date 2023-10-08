import { useParams } from "react-router-dom";
import useService from "../../../hooks/Services/useService";
import PricePackageCard from "../../../components/Services/EditService/PricePackageCard";
import ServiceImageCarousel from "../../../components/Services/EditService/ServiceImageCarousel";
import FaqDisclosure from "../../../components/Services/EditService/FaqDisclosure";
import ServiceEditor from "../../../partials/Services/ServiceEditor";

const EditService = () => {
  const { id } = useParams();
  const { response } = useService(id ? id : "");

  if (!response) return "";
  return (
    <>
      <div className="flex md:flex-row flex-wrap gap-14 p-8 justify-between w-full max-w-[80%] mx-auto">
        <div>
          <div className="mb-4">
            <h1 className="text-2xl text-black dark:text-white">
              I will {response.title}{" "}
              <span>
                <div className="badge badge-primary">
                  {response.isApproved ? "Approved" : "Pending Approval"}
                </div>
              </span>
            </h1>
            <p>{response.category}</p>
          </div>
          <ServiceImageCarousel images={response.images} />
          <div className="divider"></div>
          <div className="max-w-2xl">
            <h2 className="text-xl underline">Description</h2>
            <p className="my-2">{response.description}</p>
          </div>
          <div className="pt-10">
            <h2 className="text-xl underline ">
              Frequently Asked Question (FAQs)
            </h2>
            <FaqDisclosure faqs={response.faq} />
          </div>
        </div>
        <PricePackageCard pricePackages={response.pricePackage} />
      </div>
      <div className="divider max-w-[80%] w-full mx-auto">EDITOR</div>
      <div className="max-w-[80%] w-full mx-auto">
        <ServiceEditor service={response} />
      </div>
    </>
  );
};

export default EditService;
