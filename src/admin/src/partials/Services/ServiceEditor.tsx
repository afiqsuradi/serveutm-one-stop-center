import { Tab } from "@headlessui/react";
import useMultiForm from "../../hooks/useMultiForm";
import OverviewForm from "../../components/Services/EditService/Forms/OverviewForm";
import DescriptionForm from "../../components/Services/EditService/Forms/DescriptionForm";
import GalleryForm from "../../components/Services/EditService/Forms/GalleryForm";
import { ServiceType } from "../../hooks/Services/useServices";
import { useState } from "react";
import useUpdateService from "../../hooks/Services/useUpdateService";

interface Props {
  service: ServiceType;
}

const ServiceEditor = ({ service }: Props) => {
  const categories = ["Overview", "Description & Faq", "Gallery"];
  const [serviceData, setServiceData] = useState(service);
  const { currentStepIndex, goto, steps, step } = useMultiForm([
    <OverviewForm serviceData={serviceData} setServiceData={setServiceData} />,
    <DescriptionForm
      serviceData={serviceData}
      setServiceData={setServiceData}
    />,
    <GalleryForm serviceData={serviceData} setServiceData={setServiceData} />,
  ]);
  const { updateService } = useUpdateService(service._id);

  const changeActiveTab = (id: number) => {
    goto(id);
  };

  const update = async () => {
    try {
      await updateService(serviceData);
    } catch (error) {
      //
    }
  };

  return (
    <div className="w-full max-w-full px-2 py-16 sm:px-0">
      <Tab.Group selectedIndex={currentStepIndex} onChange={changeActiveTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-[#1D283A] p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-lg font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                  selected
                    ? "bg-[#641AE6] text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((_, idx) => (
            <Tab.Panel
              key={idx}
              className={`rounded-xl bg-[#1D283A] p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`}
            >
              {steps[currentStepIndex]}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <div className="w-full flex justify-end">
        <button
          className="btn btn-primary btn-sm m-1 max-w-[8rem] w-full my-6"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={update}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ServiceEditor;
