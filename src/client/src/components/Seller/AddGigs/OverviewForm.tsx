import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import AddGigWrapper from "../AddGigWrapper";
import PackageForm from "./PackageForm";
import { ServiceType } from "../../../pages/Seller/AddGig";

interface Props {
  serviceData: ServiceType | undefined;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const OverviewForm = ({ serviceData, setServiceData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <PackageForm
        setServiceData={setServiceData}
        isOpen={isOpen}
        onClose={onClose}
      />
      <AddGigWrapper title="Overview">
        <FormLabel>Gig title</FormLabel>
        <div className="relative">
          <Input placeholder="" className="pl-[2rem] indent-9" />
          <span className="absolute top-2 left-4 text-gray-300">I will</span>
          <div className="grid grid-cols-[3fr_1fr] text-xs text-gray-400 my-1">
            <span className="text-red-300"></span>
            <span className="place-self-end">0/70</span>
          </div>
        </div>
        <FormLabel>Category</FormLabel>
        <div className="max-w-[12rem]">
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <span className="text-red-300"></span>
        </div>
        <FormLabel>Price Package</FormLabel>
        <div className="grid md:grid-cols-3 gap-4 sm:grid-cols-2">
          {serviceData?.pricePackage.map((pricePackage) => {
            if (pricePackage.title.length === 0) return;
            return (
              <div>
                <Accordion
                  defaultIndex={[0]}
                  allowMultiple
                  className="border-2 rounded-lg max-w-[20rem]"
                >
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {pricePackage.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {pricePackage.description}
                      <Divider className="my-2" />
                      RM {pricePackage.price}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
          <Button variant="base" className="my-4" onClick={onOpen}>
            Add New
          </Button>
        </div>
      </AddGigWrapper>
    </>
  );
};

export default OverviewForm;
