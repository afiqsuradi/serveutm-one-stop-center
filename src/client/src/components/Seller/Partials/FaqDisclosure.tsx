import { Disclosure } from "@headlessui/react";
import { BiChevronUp } from "react-icons/bi";
import { ServiceType } from "../../../pages/Seller/AddGig";

interface Props {
  faqs: ServiceType["faq"];
}

const FaqDisclosure = ({ faqs }: Props) => {
  return (
    <div className="w-full pt-8">
      <div className="w-full max-w-2xl rounded-2xl bg-[#1D283A] p-2">
        {faqs.map((faqData, i) => {
          return (
            <Disclosure key={i}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-[#161F2C] px-4 py-2 text-left text-sm font-medium text-white hover:bg-[#641AE6] focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>{faqData.question}</span>
                    <BiChevronUp
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-white`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-300">
                    <p>{faqData.answer}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
};

export default FaqDisclosure;
