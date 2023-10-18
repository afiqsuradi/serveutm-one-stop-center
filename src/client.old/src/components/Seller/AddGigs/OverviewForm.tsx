import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Text,
  FormLabel,
  Heading,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import AddGigWrapper from "../AddGigWrapper";
import PackageForm from "./PackageForm";
import { useState } from "react";
import TitleInput from "./Partials/TitleInput";
import CategoryInput from "./Partials/CategoryInput";
import {
  PricingPackageType,
  ServiceType,
} from "../../../hooks/Services/useService";

interface Props {
  serviceData: ServiceType | undefined;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const OverviewForm = ({ serviceData, setServiceData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pricePackage, setPricePackage] = useState<
    PricingPackageType | undefined
  >();

  const closePricePackageModal = () => {
    onClose();
    setPricePackage(undefined);
  };

  const editPricePackageModal = (data: PricingPackageType) => {
    setPricePackage(data);
    setServiceData((prev) => {
      return {
        ...prev,
        pricePackage: prev.pricePackage.filter(
          (pack) => pack.title !== data.title
        ),
      };
    });
    onOpen();
  };

  const deletePricePackage = (title: string) => {
    setServiceData((prev) => {
      return {
        ...prev,
        pricePackage: prev.pricePackage.filter((pack) => pack.title !== title),
      };
    });
  };

  return (
    <>
      <PackageForm
        setServiceData={setServiceData}
        isOpen={isOpen}
        onClose={closePricePackageModal}
        initialData={pricePackage}
      />
      <AddGigWrapper title="Overview">
        <FormLabel>Gig title</FormLabel>
        <TitleInput serviceData={serviceData} setServiceData={setServiceData} />
        <FormLabel>Category</FormLabel>
        <CategoryInput
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
        <FormLabel>Price Package</FormLabel>
        <div className="mb-4">
          <Button variant="base" className="mb-4 w-[6rem]" onClick={onOpen}>
            Add New
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {serviceData?.pricePackage.map((pricePackage) => {
              if (pricePackage.title.length === 0) return;
              return (
                <Box key={pricePackage.title}>
                  <Card className="min-h-full border-2" variant={"outline"}>
                    <CardHeader>
                      <Heading size="md">{pricePackage.title} </Heading>
                    </CardHeader>
                    <Divider orientation="horizontal" />
                    <CardBody paddingBottom={2}>
                      <Stack spacing={4}>
                        <Text>{pricePackage.description}</Text>
                        <Text fontSize={"xl"}>RM {pricePackage.price}</Text>
                      </Stack>
                    </CardBody>
                    <Divider orientation="horizontal" />
                    <CardFooter>
                      <div className="flex justify-between gap-4">
                        <Button
                          variant="base"
                          className="w-[6rem]"
                          onClick={() => {
                            editPricePackageModal(pricePackage);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="lessDanger"
                          className="w-[6rem]"
                          onClick={() => deletePricePackage(pricePackage.title)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Box>
              );
            })}
          </div>
        </div>
      </AddGigWrapper>
    </>
  );
};

export default OverviewForm;
