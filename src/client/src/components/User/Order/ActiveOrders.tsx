import Spinner from "@/components/ui/spinner";
import useOrders from "@/hooks/Orders/useOrders";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ActiveOrders = () => {
  const { data, isLoading, error } = useOrders({
    fullfillmentStatus: "In Progress",
  });
  if (isLoading) return <Spinner />;
  if (error) {
    return (
      <div className="border rounded-lg flex justify-center items-center">
        <h4 className="text-destructive">{error}</h4>
      </div>
    );
  }
  if (!data)
    return (
      <div className="border rounded-lg flex justify-center items-center p-4">
        <h4>No services in progress</h4>
      </div>
    );
  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Gig Image</TableHead>
            <TableHead>Gig</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Placed On</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((order) => {
            return (
              <TableRow>
                <TableCell>
                  <img src={order.service.images[0]} className="w-[100px]" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <h4>{order.service.title}</h4>
                    <p className="text-foreground/60">{order.package.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p>RM {order.package.price * order.quantity}</p>
                </TableCell>
                <TableCell>
                  <p>{order.placed}</p>
                </TableCell>
                <TableCell>{order.fullfillmentStatus}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActiveOrders;
