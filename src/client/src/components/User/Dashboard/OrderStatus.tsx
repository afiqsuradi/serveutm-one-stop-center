import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveOrders from "../Order/ActiveOrders";
import CompletedOrder from "../Order/CompletedOrder";
import CanceledOrders from "../Order/CanceledOrders";

const OrderStatus = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold">Orders</h1>
      <div>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="border h-12 border-border bg-background w-full justify-start gap-4">
            <TabsTrigger
              className="w-[6rem] text-foreground/75 border-primary data-[state=active]:border-b-2 data-[state=active]:text-foreground"
              value="active"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              className="w-[6rem] text-foreground/75 border-primary data-[state=active]:border-b-2 data-[state=active]:text-foreground"
              value="completed"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              className="w-[6rem] text-foreground/75 border-primary data-[state=active]:border-b-2 data-[state=active]:text-foreground"
              value="refunded"
            >
              Canceled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <ActiveOrders />
          </TabsContent>
          <TabsContent value="completed">
            <CompletedOrder />
          </TabsContent>
          <TabsContent value="refunded">
            <CanceledOrders />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderStatus;
