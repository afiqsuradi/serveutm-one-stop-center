import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  PricingPackageType,
  ServiceType,
} from "../../../../hooks/Services/useServices";
import { useForm } from "react-hook-form";
import { PricingPackageStructResolver } from "../../../../types/pricingPackage";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
  initialData?: PricingPackageType;
}

const PricePackageForm = ({
  isOpen,
  closeModal,
  setServiceData,
  initialData,
}: Props) => {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PricingPackageType>({ resolver: PricingPackageStructResolver });
  const [error, setError] = useState("");

  const validateNewPackage = (prev: ServiceType, data: PricingPackageType) => {
    let newPackage: PricingPackageType[] = [];
    if (
      prev?.pricePackage &&
      prev.pricePackage.length !== 0 &&
      prev.pricePackage[0].title.length !== 0
    ) {
      newPackage = [...prev.pricePackage, data];
    } else {
      newPackage = [data];
    }

    if (prev.pricePackage.length >= 3)
      return setError("You have reach max amount of allowed packages");
    if (
      prev.pricePackage.filter((pack) => pack.title === data.title).length > 0
    )
      return setError("Please select different package name");
    return newPackage;
  };

  const addNewPrice = (data: PricingPackageType) => {
    setServiceData((prev) => {
      const newPackage = validateNewPackage(prev, data);
      if (newPackage) {
        closeModal();
        reset();
        return {
          ...prev,
          pricePackage: newPackage,
        };
      }
      return prev;
    });
  };

  //   Data setup if edit
  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description);
      setValue("price", initialData.price);
    }
  }, [setValue, initialData]);

  useEffect(() => {
    if (error.length > 0) {
      if (error) {
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          progress: undefined,
          theme: "colored",
        });
      }
    }
    setError("");
  }, [error]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1D283A] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="text-lg font-medium leading-6 text-white"
                >
                  New Price Package
                </Dialog.Title>
                <form
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSubmit={handleSubmit((data) => addNewPrice(data))}
                >
                  <div className="my-4">
                    <h3>Package Name</h3>
                    <input
                      className="w-full bg-[#161F2C] rounded-lg text-white my-1"
                      {...register("title")}
                      defaultValue={initialData ? initialData.title : ""}
                    />
                    <p className="text-red-500">
                      {errors.title ? errors.title.message : ""}
                    </p>
                  </div>
                  <div className="my-4">
                    <h3>Package Description</h3>
                    <textarea
                      className="w-full bg-[#161F2C] rounded-lg text-white my-1 resize-none"
                      defaultValue={initialData ? initialData.description : ""}
                      {...register("description")}
                    />
                    <p className="text-red-500">
                      {errors.description ? errors.description.message : ""}
                    </p>
                  </div>
                  <div className="my-4">
                    <h3>Package Price</h3>
                    <input
                      className="w-full bg-[#161F2C] rounded-lg text-white my-1"
                      {...register("price", { valueAsNumber: true })}
                      defaultValue={initialData ? initialData.price : 0}
                    />
                    <p className="text-red-500">
                      {" "}
                      {errors.price ? errors.price.message : ""}
                    </p>
                  </div>
                  <div className="my-4 flex justify-end w-full">
                    <button
                      className="btn btn-primary btn-sm m-1 w-20"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn bg-red-700 hover:bg-red-800 text-white m-1 w-20 btn-sm"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PricePackageForm;
