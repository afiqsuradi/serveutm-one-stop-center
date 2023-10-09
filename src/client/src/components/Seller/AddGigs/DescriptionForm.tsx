import { Box, Button, FormLabel, Textarea, useToast } from "@chakra-ui/react";
import AddGigWrapper from "../AddGigWrapper";
import { useEffect, useState } from "react";
import FaqAccordionInput from "./Partials/FaqAccordionInput";
import { ServiceType } from "../../../hooks/Services/useService";
import FaqForm from "./Partials/FaqForm";

interface Props {
  serviceData: ServiceType;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const DescriptionForm = ({ serviceData, setServiceData }: Props) => {
  const [faqIsOpen, setFaqIsOpen] = useState(false);
  const [errorToast, setErrorToast] = useState("");
  const toast = useToast();
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [errors, setErrors] = useState({
    description: "",
    answer: "",
    question: "",
  });
  const openFaq = () => {
    setFaqIsOpen(true);
  };

  const closeFaq = () => {
    setFaqIsOpen(false);
  };

  const setDescription = (
    event: React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    if (
      !(event.target.value.length >= 100 && event.target.value.length <= 500)
    ) {
      setErrors({
        ...errors,
        description: "Description should be 100 - 500 characters.",
      });
    } else {
      setErrors({
        ...errors,
        description: "",
      });
      setServiceData((prev) => {
        return { ...prev, description: event.target.value };
      });
    }
  };

  const updateDescLength = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (
      !(event.target.value.length >= 100 && event.target.value.length <= 500)
    ) {
      setErrors({
        ...errors,
        description: "Description should be 100 - 500 characters.",
      });
    } else {
      setErrors({
        ...errors,
        description: "",
      });
    }
    setDescriptionCount(() => event.target.value.length);
  };

  useEffect(() => {
    if (errorToast.length > 0) {
      if (errorToast) {
        toast({
          title: `${errorToast}`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    }
    return () => {
      setErrorToast("");
    };
  }, [errorToast]);

  return (
    <AddGigWrapper title="Description & Faq">
      <FormLabel>Description</FormLabel>
      <div className="flex flex-col">
        <Textarea
          size="lg"
          resize={"none"}
          onBlur={setDescription}
          onChange={updateDescLength}
          defaultValue={serviceData ? serviceData.description : ""}
        />
        <div className="flex">
          <span className="text-sm text-red-500">
            {errors.description.length > 0 ? errors.description : ""}
          </span>
          <span className="ml-auto text-sm text-gray-500 py-1">
            {descriptionCount ? descriptionCount : 0}/500
          </span>
        </div>
      </div>
      <FormLabel>Frequently Asked Questions (FAQ)</FormLabel>
      <Box className="flex flex-col gap-4">
        {faqIsOpen ? (
          <FaqForm
            setErrorToast={setErrorToast}
            closeFaq={closeFaq}
            serviceData={serviceData}
            setServiceData={setServiceData}
          />
        ) : (
          <Button
            variant={"base"}
            className=" w-[6rem] ml-auto mb-4"
            onClick={openFaq}
          >
            Add Faq
          </Button>
        )}
        {serviceData.faq.map((data, idx) => {
          if (!(data.question.length > 0)) return;
          return (
            <FaqAccordionInput
              data={data}
              setServiceData={setServiceData}
              key={idx}
            />
          );
        })}
      </Box>
    </AddGigWrapper>
  );
};

export default DescriptionForm;
