import {
  Box,
  Button,
  FormLabel,
  Textarea,
  Input,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import AddGigWrapper from "../AddGigWrapper";
import { useEffect, useState } from "react";
import { FaqType, ServiceType } from "../../../pages/Seller/AddGig";

interface Props {
  serviceData: ServiceType | undefined;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const DescriptionForm = ({ serviceData, setServiceData }: Props) => {
  const [faqIsOpen, setFaqIsOpen] = useState(false);
  const [errorToast, setErrorToast] = useState("");
  const toast = useToast();
  const [faqData, setFaqData] = useState<FaqType>({ question: "", answer: "" });
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [errors, setErrors] = useState({
    description: "",
    answer: "",
    question: "",
  });
  const openFaq = () => {
    setFaqIsOpen(true);
  };

  const closeFaq = () => {
    setAnswerCount(0);
    setErrors((prev) => {
      return { ...prev, answer: "", question: "" };
    });
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

  const setAnswerLength = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswerCount(event.target.value.length);
  };

  const updateDescLength = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionCount(() => event.target.value.length);
  };

  const setQuestion = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (event.target.value.length < 10) {
      setErrors({
        ...errors,
        question: "Question should contain atleast 10 words",
      });
    } else {
      setErrors({
        ...errors,
        question: "",
      });
      setFaqData({ ...faqData, question: event.target.value });
    }
  };

  const setAnswer = (event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    if (event.target.value.length < 30) {
      setErrors({
        ...errors,
        answer: "Answer should be 30 - 300 words",
      });
    } else {
      setErrors({
        ...errors,
        answer: "",
      });
      setFaqData({ ...faqData, answer: event.target.value });
    }
  };

  const validateNewFaq = (prev: FaqType[], data: FaqType) => {
    let newFaq: FaqType[] = [];
    if (
      errors.answer.length > 0 &&
      errors.question.length > 0 &&
      prev[0].answer.length !== 0
    ) {
      newFaq = [...prev, data];
    } else {
      newFaq = [data];
    }

    if (prev.filter((faq) => faq.question === data.question).length > 0)
      return setErrorToast("No duplicate question allowed.");
    return newFaq;
  };

  const addNewFaq = () => {
    if (!(errors.answer.length > 0 || errors.question.length > 0)) {
      setServiceData((prev) => {
        const newFaq = validateNewFaq(prev.faq, faqData);
        console.log(newFaq);
        if (newFaq) {
          return { ...prev, faq: newFaq };
        }
        return prev;
      });
      setFaqData({ question: "", answer: "" });
      closeFaq();
    }
  };

  const updateFaq = (title: string, question: string, answer: string) => {
    if (serviceData) {
      const newFaq = serviceData?.faq.filter(
        (faqItem) => faqItem.question !== title
      );
      newFaq.push({ question, answer });
      setServiceData((prev) => {
        return { ...prev, faq: newFaq };
      });
    }
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
          <div className="flex flex-col gap-4">
            <div>
              <Input
                placeholder="Add a Question: i.e. Do you translate english well?"
                onBlur={setQuestion}
              />
              <span className="text-sm text-red-500">
                {errors.question.length > 0 ? errors.question : ""}
              </span>
            </div>
            <div className="flex flex-col">
              <Textarea
                size="md"
                resize={"none"}
                placeholder="Add an Answer: i.e. Yes, I also translate from English to Malay"
                onChange={setAnswerLength}
                onBlur={setAnswer}
              />
              <div className="flex">
                <span className="text-sm text-red-500">
                  {errors.answer.length > 0 ? errors.answer : ""}
                </span>
                <span className="ml-auto text-sm text-gray-500 py-1">
                  {answerCount ? answerCount : 0}/300
                </span>
              </div>
            </div>
            <div className="ml-auto my-4">
              <Button
                variant={"lessDanger"}
                className=" w-[6rem] ml-auto mx-4"
                onClick={closeFaq}
              >
                Cancel
              </Button>
              <Button
                variant={"base"}
                className=" w-[6rem] ml-auto"
                onClick={addNewFaq}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
        {serviceData?.faq.map((faq) => {
          if (!(faq.question.length > 0)) return;
          return (
            <Accordion
              allowMultiple
              allowToggle
              className="border-2 rounded-md mb-4"
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {faq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack spacing={4}>
                    <Input
                      id="question"
                      placeholder="Add a Question: i.e. Do you translate english well?"
                      defaultValue={faq.question}
                    />
                    <Textarea
                      id="answer"
                      size="md"
                      resize={"none"}
                      placeholder="Add an Answer: i.e. Yes, I also translate from English to Malay"
                      defaultValue={faq.answer}
                    />
                    <Button
                      variant={"base"}
                      className=" w-[6rem] ml-auto"
                      onClick={(event) => {
                        const answer =
                          event.currentTarget.parentElement?.querySelector(
                            "#answer"
                          );
                        const question =
                          event.currentTarget.parentElement?.querySelector(
                            "#question"
                          );
                        if (answer && question) {
                          updateFaq(
                            faq.question,
                            (question as HTMLInputElement).value,
                            (answer as HTMLTextAreaElement).value
                          );
                        }
                      }}
                    >
                      Update
                    </Button>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        })}

        {faqIsOpen ? (
          ""
        ) : (
          <Button
            variant={"base"}
            className=" w-[6rem] ml-auto mb-4"
            onClick={openFaq}
          >
            Add Faq
          </Button>
        )}
      </Box>
    </AddGigWrapper>
  );
};

export default DescriptionForm;
