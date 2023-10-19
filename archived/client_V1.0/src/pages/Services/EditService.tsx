import { useParams } from "react-router-dom";
import ViewServiceDetail from "./ViewServiceDetail";
import { Alert, AlertIcon, Divider } from "@chakra-ui/react";
import EditGig from "../../components/Seller/EditGig";
import useService from "../../hooks/Services/useService";
import { defaultServiceType } from "../Seller/AddGig";

const EditService = () => {
  const { id } = useParams();
  const { data } = useService(id ? id : "");
  return (
    <>
      <Alert status="info" className="sticky top-0">
        <AlertIcon />
        You are currently editing a gigs
      </Alert>
      <ViewServiceDetail />
      <Divider />
      <EditGig data={data ? data : defaultServiceType} />
    </>
  );
};

export default EditService;
