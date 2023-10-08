import { useState } from "react";
import {
  GigsTypeOption,
  ServiceType,
} from "../../../../hooks/Services/useServices";
import PricePackageForm from "./PricePackageForm";

interface Props {
  serviceData: ServiceType;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const OverviewForm = ({ serviceData, setServiceData }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-white p-4">
      <PricePackageForm
        isOpen={isOpen}
        setServiceData={setServiceData}
        closeModal={() => setIsOpen(false)}
      />
      <h1 className="text-4xl mb-8">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] my-4 gap-8">
        <h2 className="text-xl">Gig Title</h2>
        <div className="w-full relative">
          <input
            className="bg-[#161F2C] rounded-lg pl-[2rem] indent-5 w-full"
            defaultValue={serviceData.title}
          />
          <span className="absolute top-[0.6rem] left-4 text-gray-300">
            I will
          </span>
        </div>
        <h2 className="text-xl">Category</h2>
        <select
          className="w-full bg-[#161F2C] rounded-lg"
          defaultValue={serviceData.category}
        >
          <option selected value={""}>
            Select Category
          </option>
          {GigsTypeOption.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <h2 className="text-xl">Price Package</h2>
        <button
          className="btn btn-primary btn-sm max-w-[8rem]"
          onClick={() => setIsOpen(true)}
        >
          Add New
        </button>
        <div className="md:col-start-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceData.pricePackage.map((pack, i) => {
            return (
              <div
                key={i}
                className="grid grid-rows-[1fr_2px_2fr_2px_1fr] border border-gray-700 rounded-lg"
              >
                <h1 className="text-2xl p-6">{pack.title}</h1>
                <div className="divider p-0 m-0"></div>
                <div>
                  <p className="text-lg p-6">{pack.description}</p>
                  <h3 className="text-xl p-6">RM {pack.price}</h3>
                </div>
                <div className="divider p-0 m-0"></div>
                <div className="flex w-full justify-around p-6">
                  <button className="btn btn-primary btn-sm m-1 w-[4rem] lg:w-full max-w-[8rem]">
                    Edit
                  </button>
                  <button className="btn bg-red-700 hover:bg-red-800 text-white m-1 w-[4rem] lg:w-full max-w-[8rem] btn-sm">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewForm;
