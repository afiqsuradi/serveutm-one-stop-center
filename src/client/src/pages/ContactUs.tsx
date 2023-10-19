import mascot from "@/assets/support-mascot.svg";
import InquiryForm from "@/components/InquiryForm";
import { FaPhoneVolume } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
const ContactUs = () => {
  return (
    <>
      <div className="relative bg-primary ">
        <div className="container text-center py-12 space-y-5">
          <h1 className="text-primary-foreground text-5xl">
            Have Some Question?
          </h1>
          <p className="text-primary-foreground md:max-w-[40%] font-medium md:mx-auto">
            We're here to assist you and provide the support you need. If you
            have any questions, concerns, or feedback, please don't hesitate to
            contact us. Our dedicated team is ready to help you in any way we
            can.
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-1 translate-y-full fill-primary"
          style={{ zIndex: -1 }}
        >
          <path
            fillOpacity="1"
            d="M0,128L34.3,154.7C68.6,181,137,235,206,224C274.3,213,343,139,411,112C480,85,549,107,617,128C685.7,149,754,171,823,192C891.4,213,960,235,1029,213.3C1097.1,192,1166,128,1234,122.7C1302.9,117,1371,171,1406,197.3L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="container md:grid md:grid-cols-2 md:gap-6">
        <div>
          <img
            src={mascot}
            className="hidden md:inline-block h-[25rem] w-auto "
          />
          <div className="border p-6 md:border-0 md:p-0 md:px-12 space-y-4">
            <h1 className="text-xl">Get in touch</h1>
            <div className="flex items-center">
              <div className="rounded-full border border-foreground max-w-fit p-2">
                <FaPhoneVolume className="-rotate-45 text-2xl" />
              </div>
              <p className="mx-3 text-lg">+60-196491542</p>
            </div>
            <div className="flex items-center">
              <div className="rounded-full border border-foreground max-w-fit p-2">
                <IoIosMail className=" text-2xl" />
              </div>
              <p className="mx-3 text-lg">support@serveutm.online</p>
            </div>
            <div className="flex items-center">
              <div className="rounded-full border border-foreground max-w-fit p-2">
                <FaLocationDot className=" text-2xl" />
              </div>
              <p className="mx-3 text-lg">Semarak, Kuala Lumpur</p>
            </div>
          </div>
        </div>
        <div className="md:self-end md:justify-self-center">
          <InquiryForm />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
