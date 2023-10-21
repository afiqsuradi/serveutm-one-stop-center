import { ServiceType } from "@/interface/Service";
import { Card, CardContent } from "@/components/ui/card";
import ServiceImagesCarousel from "@/components/Gigs/ServiceImagesCarousel";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

interface Props {
  service: ServiceType;
  isOwner: boolean;
}

const ServiceCard = ({ service, isOwner }: Props) => {
  const highestPrice = service.pricePackage.reduce((acc, curr) => {
    return acc > curr.price ? acc : curr.price;
  }, 0);
  const lowestPrice = service.pricePackage.reduce((acc, curr) => {
    return acc > curr.price ? curr.price : acc;
  }, highestPrice);

  return (
    <Card className="w-[250px]">
      <ServiceImagesCarousel showChild={false} images={service.images} />
      <CardContent className="flex flex-col gap-8 justify-start items-start py-2">
        <h3>I will {service.title}</h3>
        <div className=" flex justify-between items-center w-full">
          {isOwner && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hover:text-foreground/50 hover:cursor-pointer pr-2">
                    <PiDotsThreeOutlineFill className="text-2xl" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Manage Gig</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <AiFillEdit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <MdDelete className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <p className="text-xs font-thin">
            STARTING AT{" "}
            <span className="font-semibold text-base">RM{lowestPrice}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
