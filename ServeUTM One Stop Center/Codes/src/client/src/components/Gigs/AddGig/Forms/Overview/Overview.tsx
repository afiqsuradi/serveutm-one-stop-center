import AddGigFormWrapper from "@/components/Gigs/AddGig/AddGigFormWrapper";
import TitleForm from "./TitleForm";
import CategoryForm from "./CategoryForm";
import PricePackage from "./PricePackage";

const Overview = () => {
  return (
    <AddGigFormWrapper title={"Overview"}>
      <TitleForm />
      <CategoryForm />
      <PricePackage />
    </AddGigFormWrapper>
  );
};

export default Overview;
