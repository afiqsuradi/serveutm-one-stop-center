import useService from "@/hooks/Gigs/useService";
import { useParams } from "react-router-dom";
import GigDetail from "./GigDetail";
import { Separator } from "@/components/ui/separator";
import GigEditor from "@/components/Gigs/GigEditor";

const EditGig = () => {
  const { id } = useParams();
  const { data } = useService(id ? id : "");

  if (!data) return;
  return (
    <>
      <GigDetail />
      <div className="container mb-6 flex flex-col">
        <Separator className="my-6" />
        <GigEditor id={id ? id : ""} data={data} />
      </div>
    </>
  );
};

export default EditGig;
