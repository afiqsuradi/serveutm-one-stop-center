import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { PricingPackageType, ServiceType } from "../../../pages/Seller/AddGig";
import { useForm } from "react-hook-form";
import { PackagePricingStructResolver } from "../../../types/packagePrice";
import { useEffect, useState } from "react";
interface Props {
  isOpen: boolean;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
  initialData?: PricingPackageType;
  onClose: () => void;
}

const PackageForm = ({
  isOpen,
  onClose,
  setServiceData,
  initialData,
}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<PricingPackageType>({ resolver: PackagePricingStructResolver });
  const description = watch("description");
  const [error, setError] = useState("");
  const toast = useToast();

  const validateNewPackage = (prev: ServiceType, data: PricingPackageType) => {
    let newPackage: PricingPackageType[] = [];
    if (
      prev?.pricePackage &&
      prev.pricePackage.length !== 0 &&
      prev.pricePackage[0].title.length !== 0
    ) {
      newPackage = [...prev.pricePackage, data];
    } else {
      newPackage = [data];
    }

    if (prev.pricePackage.length >= 3)
      return setError("You have reach max amount of allowed packages");
    if (
      prev.pricePackage.filter((pack) => pack.title === data.title).length > 0
    )
      return setError("Please select different package name");
    return newPackage;
  };

  const addNewPrice = (data: PricingPackageType) => {
    setServiceData((prev) => {
      const newPackage = validateNewPackage(prev, data);
      if (newPackage) {
        return {
          ...prev,
          pricePackage: newPackage,
        };
      }
      return prev;
    });
    onClose();
    reset();
  };

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description);
      setValue("price", initialData.price);
    }
  }, [setValue, initialData]);

  useEffect(() => {
    if (error.length > 0) {
      if (error) {
        toast({
          title: `${error}`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    }
    setError("");
  }, [error]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          action=""
          className="flex flex-col gap-8"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit((data) => addNewPrice(data))}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Price Package</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={errors.title ? true : false}>
                <FormLabel>Package Name</FormLabel>
                <Input
                  type="text"
                  {...register("title")}
                  defaultValue={initialData ? initialData.title : ""}
                />
                {errors.title ? (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                ) : (
                  <FormHelperText>Enter the name of package</FormHelperText>
                )}
              </FormControl>
              <FormControl isInvalid={errors.description ? true : false}>
                <FormLabel>Package Description</FormLabel>
                <Textarea
                  resize="none"
                  {...register("description")}
                  defaultValue={initialData ? initialData.description : ""}
                />
                {errors.description ? (
                  <FormErrorMessage>
                    {errors.description.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Tell about your package in detail (
                    {description ? description.length : 0}/50)
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isInvalid={errors.price ? true : false}>
                <FormLabel>Package Price</FormLabel>
                <Input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  defaultValue={initialData ? initialData.price : 0}
                />
                {errors.description ? (
                  <FormErrorMessage>
                    {errors.description.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>Enter pricing for the package</FormHelperText>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="lessDanger"
                mr={3}
                onClick={onClose}
                className="w-[5rem]"
              >
                Close
              </Button>
              <Button
                type="submit"
                variant={"base"}
                mr={3}
                className="w-[5rem]"
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default PackageForm;
