import { Container } from "@chakra-ui/react";
import UserStatistic from "../components/UserDashboard/UserStatistic";
import UserOngoingOrders from "../components/UserDashboard/UserOngoingOrders";
import UserOrderHistory from "../components/UserDashboard/UserOrderHistory";

const Dashboard = () => {
  return (
    <Container maxW={"100%"} padding={"0"}>
      <UserStatistic />
      <UserOngoingOrders />
      <UserOrderHistory />
    </Container>
  );
};

export default Dashboard;
