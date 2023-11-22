import { useEffect, useState } from "react";
import useMultiForm from "../../hooks/Services/useMultiForm";
import { ServiceType } from "../../hooks/Services/useService";
import DescriptionForm from "./AddGigs/DescriptionForm";
import GalleryForm from "./AddGigs/GalleryForm";
import OverviewForm from "./AddGigs/OverviewForm";
import PublishGigs from "./AddGigs/PublishGigs";
import { Tab } from "@headlessui/react";
import { Button } from "@chakra-ui/react";
import useEditService from "../../hooks/Services/useEditService";

const EditGig = ({ data }: { data: ServiceType }) => {
  const categories = ["Overview", "Description & Faq", "Gallery"];
  const [serviceData, setServiceData] = useState<ServiceType>(data);
  const { currentStepIndex, goto, step } = useMultiForm(
    data
      ? [
          <OverviewForm
            serviceData={serviceData}
            setServiceData={setServiceData}
          />,
          <DescriptionForm
            serviceData={serviceData}
            setServiceData={setServiceData}
          />,
          <GalleryForm
            serviceData={serviceData}
            setServiceData={setServiceData}
          />,
          <PublishGigs />,
        ]
      : []
  );
  const { isLoading, updateService } = useEditService(data._id ? data._id : "");

  const changeActiveTab = (id: number) => {
    goto(id);
  };

  const onUpdateService = async () => {
    try {
      await updateService(serviceData);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (data) {
      setServiceData(data);
    }
  }, [data]);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[90%] px-2 py-16 sm:px-0">
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
                {step}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <div className="w-full flex justify-end">
          <Button
            isLoading={isLoading}
            onClick={() => {
              void onUpdateService();
            }}
            variant={"base"}
            className="btn btn-primary btn-sm m-1 max-w-[8rem] w-full my-6"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            // onClick={update}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditGig;
