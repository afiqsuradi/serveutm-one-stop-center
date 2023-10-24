import AddGigFormWrapper from "../../AddGigFormWrapper";
import DescriptionForm from "./DescriptionForm";
import FaqForm from "./Faq/FaqForm";

const Description = () => {
  return (
    <AddGigFormWrapper title={"Description & Faq"}>
      <DescriptionForm />
      <FaqForm />
    </AddGigFormWrapper>
  );
};

export default Description;
