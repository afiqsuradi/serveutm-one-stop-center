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
} from "@chakra-ui/react";
import { PricingPackageType, ServiceType } from "../../../pages/Seller/AddGig";
import { useForm } from "react-hook-form";
import { PackagePricingStructResolver } from "../../../types/packagePrice";
interface Props {
  isOpen: boolean;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
  onClose: () => void;
}

const PackageForm = ({ isOpen, onClose, setServiceData }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<PricingPackageType>({ resolver: PackagePricingStructResolver });
  const description = watch("description");
  const addNewPrice = (data: PricingPackageType) => {
    setServiceData((prev) => {
      let newPackage: PricingPackageType[] = [];
      if (prev?.pricePackage && prev.pricePackage[0].title.length !== 0) {
        newPackage = [...prev.pricePackage, data];
      } else {
        newPackage = [data];
      }
      return {
        ...prev,
        pricePackage: newPackage,
      };
    });
    onClose();
    reset();
  };

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
                <Input type="text" {...register("title")} />
                {errors.title ? (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                ) : (
                  <FormHelperText>Enter the name of package</FormHelperText>
                )}
              </FormControl>
              <FormControl isInvalid={errors.description ? true : false}>
                <FormLabel>Package Description</FormLabel>
                <Textarea resize="none" {...register("description")} />
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
