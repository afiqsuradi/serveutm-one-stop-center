import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { FaqStruct, FaqStructResolver } from "../../../../types/faq";
import { useForm } from "react-hook-form";
import { FaqType, ServiceType } from "../../../../hooks/Services/useService";

interface Props {
  data: FaqType;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const FaqAccordionInput = ({ data, setServiceData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqStruct>({ resolver: FaqStructResolver });

  const updateFaq = (newData: FaqType) => {
    setServiceData((prev) => {
      const filterFaq = prev.faq.filter(
        (faqObj) => faqObj.question !== data.question
      );
      return { ...prev, faq: [...filterFaq, newData] };
    });
  };

  const deleteFaq = () => {
    setServiceData((prev) => {
      const filterFaq = prev.faq.filter(
        (faqObj) => faqObj.question !== data.question
      );
      return { ...prev, faq: [...filterFaq] };
    });
  };

  return (
    <Accordion allowMultiple allowToggle className="border-2 rounded-md mb-4">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {data.question}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit((newData) => updateFaq(newData))}
          >
            <Stack spacing={4}>
              <div>
                <Input
                  id="question"
                  placeholder="Add a Question: i.e. Do you translate english well?"
                  defaultValue={data.question}
                  {...register("question")}
                />
                <span className="text-sm text-red-500">
                  {errors.question ? errors.question.message : ""}
                </span>
              </div>
              <div>
                <Textarea
                  id="answer"
                  size="md"
                  resize={"none"}
                  placeholder="Add an Answer: i.e. Yes, I also translate from English to Malay"
                  defaultValue={data.answer}
                  {...register("answer")}
                />
                <span className="text-sm text-red-500">
                  {errors.answer ? errors.answer.message : ""}
                </span>
              </div>
              <div className="w-full flex justify-end gap-4">
                <Button
                  variant={"danger"}
                  className=" w-[6rem] "
                  type="button"
                  onClick={deleteFaq}
                >
                  Delete
                </Button>
                <Button variant={"base"} className=" w-[6rem] " type="submit">
                  Update
                </Button>
              </div>
            </Stack>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default FaqAccordionInput;
