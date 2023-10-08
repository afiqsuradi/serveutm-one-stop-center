/* eslint-disable @typescript-eslint/no-misused-promises */
import { Disclosure } from "@headlessui/react";
import {
  FaqType,
  ServiceType,
} from "../../../../../hooks/Services/useServices";
import { BiChevronUp } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { FaqFormStruct, FaqFormStructResolver } from "../../../../../types/faq";

interface Props {
  faqData: FaqType;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}
const FaqDisclosureForm = ({ faqData, setServiceData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqFormStruct>({
    resolver: FaqFormStructResolver,
  });

  const updateFaq = (data: FaqType) => {
    setServiceData((prev) => {
      const filterFaq = prev.faq.filter(
        (faqObj) => faqObj.question !== faqData.question
      );
      return { ...prev, faq: [...filterFaq, data] };
    });
  };

  const deleteFaq = () => {
    setServiceData((prev) => {
      const filterFaq = prev.faq.filter(
        (faqObj) => faqObj.question !== faqData.question
      );
      return { ...prev, faq: [...filterFaq] };
    });
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#641AE6] px-4 py-2 my-2 text-left text-sm font-medium text-white hover:bg-[#641AE6] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>{faqData.question}</span>
            <BiChevronUp
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-white`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-300">
            <form onSubmit={handleSubmit(updateFaq)}>
              <div className="mb-4">
                <input
                  {...register("question")}
                  placeholder="Add a Question: i.e. Do you translate english well?"
                  defaultValue={faqData.question}
                  className="w-full bg-[#161F2C] rounded-lg text-white my-1"
                />
                <p className="text-red-500">
                  {errors.question ? errors.question.message : ""}
                </p>
              </div>
              <div className="my-4">
                <textarea
                  {...register("answer")}
                  className="w-full bg-[#161F2C] rounded-lg text-white my-1 resize-none"
                  defaultValue={faqData.answer}
                  placeholder="Add an Answer: i.e. Yes, I also translate from English to Malay"
                />
                <p className="text-red-500">
                  {errors.answer ? errors.answer.message : ""}
                </p>
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="btn btn-primary btn-sm m-1 w-[8rem]"
                  type="submit"
                >
                  Save
                </button>
                <button
                  onClick={deleteFaq}
                  type="button"
                  className="btn bg-red-700 hover:bg-red-800 text-white m-1  btn-sm w-[8rem]"
                >
                  Delete
                </button>
              </div>
            </form>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default FaqDisclosureForm;
