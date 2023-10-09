import { useEffect, useRef, useState } from "react";
import { ServiceType } from "../../../pages/Seller/AddGig";
import { Image } from "@chakra-ui/react";
import {
  BiSolidChevronLeftCircle,
  BiSolidChevronRightCircle,
} from "react-icons/bi";

interface Props {
  images: ServiceType["images"];
}

const ServiceImageCarousel = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const MAX_IMAGE = images.length - 1;
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const nextImage = () => {
    const nextIndex = activeIndex + 1 <= MAX_IMAGE ? activeIndex + 1 : 0;
    if (imagesRef.current[activeIndex] && imagesRef.current[nextIndex]) {
      imagesRef.current[activeIndex].dataset.status = "after";
      imagesRef.current[nextIndex].dataset.status = "activeFromAfter";
      setTimeout(() => {
        imagesRef.current[nextIndex].dataset.status = "active";
        setActiveIndex(() => nextIndex);
      });
    }
  };

  const prevImage = () => {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : MAX_IMAGE;
    if (imagesRef.current[activeIndex] && imagesRef.current[nextIndex]) {
      imagesRef.current[activeIndex].dataset.status = "before";
      imagesRef.current[nextIndex].dataset.status = "activeFromBefore";
      setTimeout(() => {
        imagesRef.current[nextIndex].dataset.status = "active";
        setActiveIndex(() => nextIndex);
      });
    }
  };

  const goto = (idx: number) => {
    if (idx > MAX_IMAGE || idx < 0) return;
    if (idx - activeIndex > 0) {
      imagesRef.current[activeIndex].dataset.status = "after";
      imagesRef.current[idx].dataset.status = "activeFromAfter";
      setTimeout(() => {
        imagesRef.current[idx].dataset.status = "active";
        setActiveIndex(() => idx);
      });
    } else {
      imagesRef.current[activeIndex].dataset.status = "before";
      imagesRef.current[idx].dataset.status = "activeFromBefore";
      setTimeout(() => {
        imagesRef.current[idx].dataset.status = "active";
        setActiveIndex(() => idx);
      });
    }
  };

  useEffect(() => {
    imagesRef.current = imagesRef.current.slice(0, images.length - 1);
  }, [images.length]);

  return (
    <div className="grid grid-rows-[3fr_1fr] max-w-[60rem] gap-4">
      <div className="relative overflow-hidden">
        {images.map((img, i) => (
          <Image
            key={i}
            data-status={i == 0 ? "active" : "before"}
            className={`
            aspect-video w-full max-w-[60rem]
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
                imagesRef.current[i] = el;
              }
            }}
          />
        ))}
        <button
          id={"img_nav"}
          className={`absolute translate-y-[-50%] top-[50%] left-8 scale-[4] drop-shadow-xl transition-all z-30`}
          onClick={prevImage}
        >
          <BiSolidChevronLeftCircle />
        </button>
        <button
          id={"img_nav"}
          className={`absolute translate-y-[-50%] top-[50%] right-8 scale-[4] drop-shadow-xl transition-all z-30`}
          onClick={nextImage}
        >
          <BiSolidChevronRightCircle />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, idx) => {
          return (
            <div
              className="aspect-video relative hover:cursor-pointer"
              onClick={() => goto(idx)}
            >
              <Image key={idx} src={image} className="h-full" />
              {idx === activeIndex ? (
                ""
              ) : (
                <div className="absolute inset-0 bg-white opacity-50"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceImageCarousel;
