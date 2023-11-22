import { useForm } from "react-hook-form";
import { FaqFormStruct, FaqFormStructResolver } from "../../../../../types/faq";
import {
  FaqType,
  ServiceType,
} from "../../../../../hooks/Services/useServices";

interface Props {
  setServiceData: React.Dispatch<React.SetStateAction<ServiceType>>;
  onClose: () => void;
}

const FaqForm = ({ setServiceData, onClose }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqFormStruct>({
    resolver: FaqFormStructResolver,
  });

  const addNewFaq = (data: FaqType) => {
    setServiceData((prev) => {
      return { ...prev, faq: [...prev.faq, data] };
    });
    reset();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit((data) => addNewFaq(data))}>
      <div className="mb-4">
        <input
          placeholder="Add a Question: i.e. Do you translate english well?"
          className="w-full bg-[#161F2C] rounded-lg text-white my-1"
          {...register("question")}
        />
        <p className="text-red-500">
          {errors.question ? errors.question.message : ""}
        </p>
      </div>
      <div className="my-4">
        <textarea
          className="w-full bg-[#161F2C] rounded-lg text-white my-1 resize-none"
          placeholder="Add an Answer: i.e. Yes, I also translate from English to Malay"
          {...register("answer")}
        />
        <p className="text-red-500">
          {errors.answer ? errors.answer.message : ""}
        </p>
      </div>
      <div className="w-full flex justify-end">
        <button className="btn btn-primary btn-sm m-1 w-[8rem]" type="submit">
          Save
        </button>
        <button
          type="button"
          className="btn bg-red-700 hover:bg-red-800 text-white m-1 w-20 btn-sm w-[8rem]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default FaqForm;
