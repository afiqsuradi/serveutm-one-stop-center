import { useEffect, useState } from "react";
import { ServiceType } from "../../../../hooks/Services/useServices";
import FaqForm from "./Partials/FaqForm";
import DescField from "./Partials/DescField";
import FaqDisclosureForm from "./Partials/FaqDisclosureForm";

interface Props {
  serviceData: ServiceType;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const DescriptionForm = ({ setServiceData, serviceData }: Props) => {
  const [faqIsOpen, setFaqIsOpen] = useState(false);

  return (
    <div className="text-white p-4">
      <h1 className="text-4xl mb-8">Description & Faq</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] my-4 gap-8">
        <h2 className="text-xl">Description</h2>
        <DescField serviceData={serviceData} setServiceData={setServiceData} />
        <h2 className="text-xl">Frequently Asked Questions (FAQ)</h2>
        <div className="w-full">
          {faqIsOpen ? (
            <FaqForm
              setServiceData={setServiceData}
              onClose={() => setFaqIsOpen(false)}
            />
          ) : (
            <button
              className="btn btn-primary btn-sm max-w-[8rem] lg:w-[8rem]"
              onClick={() => setFaqIsOpen(true)}
            >
              Add New
            </button>
          )}

          <div className="w-full pt-8">
            <div className="w-full rounded-2xl bg-[#161F2C] p-2">
              {serviceData.faq.map((data, i) => {
                return (
                  <FaqDisclosureForm
                    key={i}
                    setServiceData={setServiceData}
                    faqData={data}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionForm;
