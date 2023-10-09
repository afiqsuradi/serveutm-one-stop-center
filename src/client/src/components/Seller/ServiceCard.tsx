import { Image, Text } from "@chakra-ui/react";
import { ServiceType } from "../../pages/Seller/AddGig";
import {
  BiSolidChevronLeftCircle,
  BiSolidChevronRightCircle,
} from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  serviceData: ServiceType;
}

const ServiceCard = ({ serviceData }: Props) => {
  const navigate = useNavigate();
  const MAX_IMAGE = serviceData.images.length - 1;
  const images = useRef<HTMLImageElement[]>([]);
  const [focus, setFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const highestPrice = serviceData.pricePackage.reduce((acc, curr) => {
    return acc > curr.price ? acc : curr.price;
  }, 0);
  const lowestPrice = serviceData.pricePackage.reduce((acc, curr) => {
    return acc > curr.price ? curr.price : acc;
  }, highestPrice);

  const nextImage = () => {
    const nextIndex = activeIndex + 1 <= MAX_IMAGE ? activeIndex + 1 : 0;
    if (images.current[activeIndex] && images.current[nextIndex]) {
      images.current[activeIndex].dataset.status = "after";
      images.current[nextIndex].dataset.status = "activeFromAfter";
      setTimeout(() => {
        images.current[nextIndex].dataset.status = "active";
        setActiveIndex(() => nextIndex);
      });
    }
  };

  const prevImage = () => {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : MAX_IMAGE;
    if (images.current[activeIndex] && images.current[nextIndex]) {
      images.current[activeIndex].dataset.status = "before";
      images.current[nextIndex].dataset.status = "activeFromBefore";
      setTimeout(() => {
        images.current[nextIndex].dataset.status = "active";
        setActiveIndex(() => nextIndex);
      });
    }
  };

  useEffect(() => {
    images.current = images.current.slice(0, serviceData.images.length - 1);
  }, [serviceData.images.length]);

  return (
    <figure
      className="overflow-hidden relative max-w-[16rem] border-2 mx-auto text-start flex flex-col rounded-lg"
      onMouseEnter={() => {
        setFocus(true);
      }}
      onMouseLeave={() => setFocus(false)}
    >
      <div className="relative aspect-video">
        {serviceData.images.map((img, i) => (
          <Image
            key={i}
            data-status={i == 0 ? "active" : "before"}
            className={`
            aspect-video
            h-full absolute 
            data-[status=before]:z-0 
            data-[status=active]:z-20
            data-[status=before]:translate-x-[-100%] 
            data-[status=after]:translate-x-[100%] 
            data-[status=after]:z-10 transition-all
            data-[status=activeFromAfter]:translate-x-[-100%] 
            data-[status=activeFromAfter]:transition-none
            data-[status=activeFromBefore]:translate-x-[100%] 
            data-[status=activeFromBefore]:transition-none`}
            src={img}
            alt="Gigs Image"
            ref={(el) => {
              if (el) {
                images.current[i] = el;
              }
            }}
          />
        ))}
        <button
          onClick={prevImage}
          id={"img_nav"}
          className={`${
            focus ? "opacity-100" : "opacity-0"
          } absolute translate-y-[-50%] top-[50%] left-4 scale-[2] drop-shadow-xl transition-all z-30`}
        >
          <BiSolidChevronLeftCircle />
        </button>
        <button
          id={"img_nav"}
          onClick={nextImage}
          className={`${
            focus ? "opacity-100" : "opacity-0"
          } absolute translate-y-[-50%] top-[50%] right-4 scale-[2] drop-shadow-xl transition-all z-30`}
        >
          <BiSolidChevronRightCircle />
        </button>
        <span className="text-xs absolute top-2 left-2 z-[999] bg-slate-800 p-1 rounded-md shadow-xl">
          {serviceData.isApproved ? "Approved" : "Pending Approval"}
        </span>
      </div>
      <div className="flex flex-col justify-between gap-8 p-3 flex-1">
        <div>
          <Text
            fontSize={"lg"}
            className="hover:cursor-pointer hover:underline hover:text-gray-200 transition-all"
            onClick={() => {
              if (serviceData._id) {
                navigate(`/services/${serviceData._id}`);
              }
            }}
          >
            I will {serviceData.title}
          </Text>
        </div>
        <div>
          <Text fontSize={"xs"}>
            STARTING AT <span className="text-base">RM{lowestPrice}</span>
          </Text>
        </div>
      </div>
    </figure>
  );
};

export default ServiceCard;
