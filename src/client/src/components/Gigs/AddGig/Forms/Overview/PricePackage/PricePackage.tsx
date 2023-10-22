import RegisterFormWrapper from "@/components/Service_Provider/Register/RegisterFormWrapper";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import PackageModal from "./PackageModal";
import { useGig } from "@/hooks/Gigs/useGig";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PricingPackageType } from "@/interface/Service";

const PricePackage = () => {
  const { service, setService } = useGig();
  const [isOpen, setIsOpen] = useState(false);
  const [initialValue, setInitialValue] = useState<PricingPackageType>();

  const onCloseModal = (val: boolean) => {
    setInitialValue(undefined);
    setIsOpen(val);
  };

  const onDeletePackage = (data: PricingPackageType) => {
    const newPackage = service.pricePackage.filter(
      (pack) => pack.title !== data.title
    );
    setService({ ...service, pricePackage: newPackage });
  };

  const onEditPackage = (data: PricingPackageType) => {
    setInitialValue(data);
    setIsOpen(true);
    onDeletePackage(data);
  };

  useEffect(() => {
    const newPack = service.pricePackage.filter(
      (pack) => pack.title.length > 0
    );
    setService({ ...service, pricePackage: newPack });
  }, []);
  return (
    <RegisterFormWrapper title={"Price Package"}>
      <PackageModal
        isOpen={isOpen}
        setIsOpen={onCloseModal}
        initialValue={initialValue}
      />
      <Button className="w-[6rem]" onClick={() => setIsOpen(true)}>
        Add New
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {service.pricePackage.map((pack) => {
          return (
            <Card className="w-full h-full md:w-[250px] flex flex-col min-h-full">
              <CardHeader>
                <CardTitle>
                  <h3 className="font-bold">{pack.title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <article className="space-y-4">
                  <p className="font-light text-sm text-foreground/80">
                    {pack.description}
                  </p>
                  <h5>RM {pack.price}</h5>
                </article>
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <Button
                  className="w-[6rem]"
                  onClick={() => onEditPackage(pack)}
                >
                  Edit
                </Button>
                <Button
                  className="w-[6rem]"
                  variant={"destructive"}
                  onClick={() => onDeletePackage(pack)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </RegisterFormWrapper>
  );
};

export default PricePackage;
