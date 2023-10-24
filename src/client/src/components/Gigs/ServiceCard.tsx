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
import { useNavigate } from "react-router-dom";
import ROUTES from "@/constant/routes";
import { Badge } from "../ui/badge";
import { useState } from "react";
import DeleteServicePrompt from "./DeleteServicePrompt";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const cardVariants = {
  default: "bg-background text-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

const cardVariantsArr = Object.keys(
  cardVariants
) as (keyof typeof cardVariants)[];

interface Props {
  service: ServiceType;
  isOwner: boolean;
  variant?: (typeof cardVariantsArr)[number];
}

const ServiceCard = ({ service, isOwner, variant = "default" }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const highestPrice = service.pricePackage.reduce((acc, curr) => {
    return acc > curr.price ? acc : curr.price;
  }, 0);
  const lowestPrice = service.pricePackage.reduce((acc, curr) => {
    return acc > curr.price ? curr.price : acc;
  }, highestPrice);

  const goto = (route: string) => {
    navigate(route);
  };

  return (
    <>
      {isOwner && service._id ? (
        <DeleteServicePrompt
          id={service._id}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      ) : (
        ""
      )}
      <Card
        className={cn(
          cardVariants[variant],
          "w-[270px] flex flex-col overflow-hidden"
        )}
      >
        <div className="relative w-full">
          <ServiceImagesCarousel showChild={false} images={service.images} />
          {isOwner ? (
            <Badge
              variant={
                service.isApproved === "Rejected"
                  ? "destructive"
                  : service.isApproved === "Approved"
                  ? "default"
                  : "secondary"
              }
              className={`absolute top-2 left-2 z-[2]`}
            >
              {service.isApproved}
            </Badge>
          ) : (
            ""
          )}
        </div>
        <CardContent className="grid grid-rows-[2fr_1fr] gap-4 justify-start items-start py-2 h-full">
          <div className="flex flex-col gap-1">
            {service.owner instanceof Object && (
              <div className="flex items-center">
                <Avatar className="w-[2.5rem] h-[2.5rem]">
                  <AvatarImage
                    src={service.owner.profileImage}
                    className="object-cover"
                  />
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
                <Separator
                  orientation="vertical"
                  className="border-card/80 mx-[0.3rem] h-[2rem]"
                />
                <div className="flex flex-col justify-center">
                  <h5
                    className="hover:underline hover:cursor-pointer transition-all text-base"
                    onClick={() =>
                      navigate(
                        `${ROUTES.USER_PROFILE}?username=${service.owner?.username}`
                      )
                    }
                  >
                    {service.owner?.username}
                  </h5>
                </div>
              </div>
            )}
            <h3
              className="hover:underline hover:cursor-pointer transition-all"
              onClick={() =>
                goto(ROUTES.VIEW_SERVICE_SPECIFIC.split(":")[0] + service._id)
              }
            >
              I will {service.title}
            </h3>
          </div>
          <div className=" flex items-center justify-between w-full mt-auto">
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
                      <DropdownMenuItem
                        onClick={() =>
                          goto(ROUTES.EDIT_SERVICE.split(":")[0] + service._id)
                        }
                      >
                        <AiFillEdit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setIsOpen(true)}
                      >
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
    </>
  );
};

export default ServiceCard;
