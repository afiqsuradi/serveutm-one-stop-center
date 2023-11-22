import { useState } from "react";
import { PricingPackageType } from "../../../hooks/Services/useServices";

interface Props {
  pricePackages: PricingPackageType[];
}
const PricePackageCard = ({ pricePackages }: Props) => {
  const [activePrice, setActivePrice] = useState(0);
  return (
    <div className="sticky top-24 card shadow-xl bg-white text-black dark:bg-[#1D283A] dark:text-white flex-wrap md:flex-nowrap justify-center max-w-[25rem] h-fit">
      <div className="tabs tabs-boxed border-0 max-w-fit mt-4 ml-4 mr-4 flex-nowrap">
        {pricePackages.map((price, i) => {
          return (
            <a
              key={price.title}
              className={` tab tab-lg leading-tight ${
                activePrice === i ? "tab-active" : ""
              }`}
              onClick={() => setActivePrice(i)}
            >
              {price.title}
            </a>
          );
        })}
      </div>
      <div className="divider my-2 p-2"></div>
      <div className="flex flex-col gap-4 justify-between ml-7 mr-7 mb-7">
        <h2>{pricePackages[activePrice].description}</h2>
        <span className="p-2 bg-[#161f2c] max-w-fit text-white rounded-md">
          RM {pricePackages[activePrice].price}
        </span>
      </div>
    </div>
  );
};

export default PricePackageCard;
