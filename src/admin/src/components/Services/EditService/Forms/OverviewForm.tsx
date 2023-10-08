import { useState } from "react";
import {
  GigsTypeOption,
  ServiceType,
} from "../../../../hooks/Services/useServices";
import PricePackageForm from "./PricePackageForm";
import { ZodError, z } from "zod";

interface Props {
  serviceData: ServiceType;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}
const titleSchema = z
  .string()
  .min(10, "Title should be 10 - 70 characters.")
  .max(70, "Title should be 10 - 70 characters.");

const categorySchema = z.enum(GigsTypeOption);

const OverviewForm = ({ serviceData, setServiceData }: Props) => {
  const [error, setError] = useState({ title: "", category: "" });
  const [isOpen, setIsOpen] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (titleSchema.parse(event.target.value) === event.target.value) {
        if (error.title.length > 0) {
          setError({ ...error, title: "" });
        }
      }
    } catch (err) {
      setError({ ...error, title: (err as ZodError).errors[0].message });
    }
  };

  const onTitleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (error.title.length > 0) return;
    setServiceData((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const category = event.target.value;
      console.log(categorySchema.parse(category));
      if (categorySchema.parse(category) === category) {
        setError({ ...error, category: "" });
        setServiceData((prev) => {
          return { ...prev, category: category };
        });
      }
    } catch (_) {
      setError({ ...error, category: "Please select a category" });
    }
  };

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
          <div>
            <input
              className="bg-[#161F2C] rounded-lg pl-[2rem] indent-5 w-full"
              onChange={onTitleChange}
              onBlur={onTitleBlur}
              defaultValue={serviceData.title}
            />
            <p className="text-red-500">{error.title}</p>
          </div>
          <span className="absolute top-[0.6rem] left-4 text-gray-300">
            I will
          </span>
        </div>
        <h2 className="text-xl">Category</h2>
        <div>
          <select
            onChange={onCategoryChange}
            className="w-full bg-[#161F2C] rounded-lg"
            defaultValue={serviceData.category}
          >
            <option value={""}>Select Category</option>
            {GigsTypeOption.map((option, i) => (
              <option value={option} key={i}>
                {option}
              </option>
            ))}
          </select>
          <p className="text-red-500">{error.category}</p>
        </div>
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
