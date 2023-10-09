import { useState } from "react";
import { PricingPackageType } from "../../../pages/Seller/AddGig";
import { Button } from "@chakra-ui/react";

interface Props {
  pricePackages: PricingPackageType[];
}
const PricePackageCard = ({ pricePackages }: Props) => {
  const [activePrice, setActivePrice] = useState(0);
  return (
    <div className="grid grid-rows-[1fr_4fr] border-2 rounded-lg sticky top-4 shadow-xl bg-white text-black dark:bg-[#1D283A] dark:text-white flex-wrap md:flex-nowrap justify-center max-w-[20rem] h-fit">
      <div className="border-b-2 grid grid-cols-3 items-center">
        {pricePackages.map((price, i) => {
          return (
            <a
              key={price.title}
              className={`text-center w-full h-full hover:cursor-pointer flex justify-center items-center ${
                i === activePrice ? "bg-[#641AE6]" : ""
              }`}
              onClick={() => setActivePrice(i)}
            >
              <span>{price.title}</span>
            </a>
          );
        })}
      </div>
      <div>
        <div className="flex flex-col gap-4 justify-between m-7">
          <h2>{pricePackages[activePrice].description}</h2>
          <span className="p-2 bg-[#161f2c] max-w-fit text-white rounded-md">
            RM {pricePackages[activePrice].price}
          </span>
          <Button variant="base">Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default PricePackageCard;
