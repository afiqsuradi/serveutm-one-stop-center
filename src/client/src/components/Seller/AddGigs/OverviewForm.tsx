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
  Input,
  Select,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import AddGigWrapper from "../AddGigWrapper";
import PackageForm from "./PackageForm";
import { PricingPackageType, ServiceType } from "../../../pages/Seller/AddGig";
import { useRef, useState } from "react";

interface Props {
  serviceData: ServiceType | undefined;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const OverviewForm = ({ serviceData, setServiceData }: Props) => {
  const title = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [titleCount, setTitleCount] = useState(0);
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.value) {
      setTitleCount(() => {
        return event.target.value.length;
      });
    }
  };

  const handleTitleBlur = () => {
    if (title.current) {
      const newTitle = title.current.value;
      setServiceData((prev) => {
        return { ...prev, title: newTitle };
      });
    }
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
        <div className="relative">
          <Input
            defaultValue={serviceData ? serviceData.title : ""}
            ref={title}
            placeholder=""
            className="pl-[2rem] indent-9"
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
          />
          <span className="absolute top-2 left-4 text-gray-300">I will</span>
          <div className="grid grid-cols-[3fr_1fr] text-xs text-gray-400 my-1">
            <span className="text-red-300"></span>
            <span className="place-self-end">{titleCount}/70</span>
          </div>
        </div>
        <FormLabel>Category</FormLabel>
        <div className="max-w-[12rem]">
          <Select
            defaultValue={serviceData ? serviceData.category : ""}
            placeholder="Select option"
            onChange={(event) => {
              setServiceData((prev) => {
                return { ...prev, category: event.target.value };
              });
            }}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <span className="text-red-300"></span>
        </div>
        <FormLabel>Price Package</FormLabel>
        <div className="mb-4">
          <Button variant="base" className="mb-4 w-[6rem]`" onClick={onOpen}>
            Add New
          </Button>
          <div className="grid md:grid-cols-3 gap-4 sm:grid-cols-2">
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
