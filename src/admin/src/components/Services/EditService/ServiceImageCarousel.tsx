import { useState } from "react";
import { ServiceType } from "../../../hooks/Services/useServices";

interface Props {
  images: ServiceType["images"];
}

const ServiceImageCarousel = ({ images }: Props) => {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className="grid grid-rows-[26rem_9rem] gap-4 md:max-w-[45rem] justify-center items-center overflow-auto">
      <div className="w-full">
        <img className="aspect-video w-full" src={images[activeImage]} />
      </div>
      <div className="grid md:grid-cols-3 gap-4 place-self-center overflow-x-scroll">
        {images.map((image, i) => {
          return (
            <img
              className="aspect-video w-full h-auto cursor-pointer"
              src={image}
              onClick={() => setActiveImage(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ServiceImageCarousel;
