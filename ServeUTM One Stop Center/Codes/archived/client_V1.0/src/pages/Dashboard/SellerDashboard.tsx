import SellerCompletedOrder from "../../components/SellerDashboard/SellerCompletedOrder";
import SellerGigs from "../../components/SellerDashboard/SellerGigs";
import SellerOngoingOrders from "../../components/SellerDashboard/SellerOngoingOrders";
import SellerStatistic from "../../components/SellerDashboard/SellerStatistic";
import { Container } from "@chakra-ui/react";

const SellerDashboard = () => {
  return (
    <Container maxW={"100%"} padding={"0"}>
      <SellerStatistic />
      <SellerGigs />
      <SellerOngoingOrders />
      <SellerCompletedOrder />
    </Container>
  );
};

export default SellerDashboard;
