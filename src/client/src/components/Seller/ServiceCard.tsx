import { Image, Text } from "@chakra-ui/react";
import { ServiceType } from "../../pages/Seller/AddGig";

interface Props {
  serviceData: ServiceType;
}

const ServiceCard = ({ serviceData }: Props) => {
  const highestPrice = serviceData.pricePackage.reduce((acc, curr) => {
    return acc > curr.price ? acc : curr.price;
  }, 0);
  const lowestPrice = serviceData.pricePackage.reduce((acc, curr) => {
    return acc > curr.price ? curr.price : acc;
  }, highestPrice);
  return (
    <figure className="overflow-hidden relative max-w-[15rem] border-2 mx-auto text-start flex flex-col">
      <div>
        <Image
          className="aspect-video max-h-[10rem]"
          src={serviceData.images[0]}
          alt="Gigs Image"
        />
      </div>
      <div className="flex flex-col justify-between gap-8 p-3 flex-1">
        <div>
          <Text fontSize={"lg"}>{serviceData.title}</Text>
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
