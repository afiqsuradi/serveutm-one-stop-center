import { Button, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaqStruct, FaqStructResolver } from "../../../../types/faq";
import { useEffect } from "react";
import { FaqType, ServiceType } from "../../../../hooks/Services/useService";

interface Props {
  setErrorToast: React.Dispatch<React.SetStateAction<string>>;
  closeFaq: () => void;
  serviceData: ServiceType;
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const FaqForm = ({
  serviceData,
  setServiceData,
  closeFaq,
  setErrorToast,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FaqStruct>({ resolver: FaqStructResolver });
  const ansRef = watch("answer");
  const addNewFaq = (data: FaqType) => {
    if (
      serviceData.faq.filter((faq) => faq.question === data.question).length > 0
    )
      return setErrorToast("No duplicate question allowed.");
    const newData = serviceData.faq.filter((faq) => faq.question.length !== 0);
    setServiceData((prev) => {
      return { ...prev, faq: [...newData, data] };
    });
    closeFaq();
  };

  useEffect(() => {
    setValue("question", "");
    setValue("answer", "");
  }, []);

  return (
    <form
      className="flex flex-col gap-4"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => addNewFaq(data))}
    >
      <div>
        <Input
          placeholder="Add a Question: i.e. Do you translate english well?"
          {...register("question")}
        />
        <span className="text-sm text-red-500">
          {errors.question ? errors.question.message : ""}
        </span>
      </div>
      <div className="flex flex-col">
        <Textarea
          size="md"
          resize={"none"}
          placeholder="Add an Answer: i.e. Yes, I also translate from English to Malay"
          {...register("answer")}
        />
        <div className="flex">
          <span className="text-sm text-red-500">
            {errors.answer ? errors.answer.message : ""}
          </span>
          <span className="ml-auto text-sm text-gray-500 py-1">
            {ansRef ? ansRef.length : 0}/300
          </span>
        </div>
      </div>
      <div className="ml-auto my-4">
        <Button
          variant={"lessDanger"}
          className=" w-[6rem] ml-auto mx-4"
          onClick={closeFaq}
          type="button"
        >
          Cancel
        </Button>
        <Button variant={"base"} className=" w-[6rem] ml-auto" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default FaqForm;
