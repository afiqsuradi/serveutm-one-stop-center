import ContactBtn from "@/components/Chat/ContactBtn";
import ServiceImagesCarousel from "@/components/Gigs/ServiceImagesCarousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import useReject from "@/hooks/Orders/useReject";
import { OrderType } from "@/interface/Orders";

interface Props {
  order: OrderType;
  children: React.ReactNode;
}

const UserOrderDetailDialog = ({ order, children }: Props) => {
  const { reject, isLoading } = useReject();

  const onReject = (id: string) => {
    reject(id);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 p-4 border rounded-lg">
          <div>
            <h2>I will {order.service.title}</h2>
            <p className="text-sm text-foreground/75">
              {order.fullfillmentStatus}
            </p>
          </div>
          <ServiceImagesCarousel
            showChild={false}
            images={order.service.images}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <h4 className="text-foreground/75">Gig Owner</h4>
          <p className="text-end">{order.serviceOwner.username}</p>
          <h4 className="text-foreground/75">Placed On</h4>
          <p className="text-end">{order.placed}</p>
          <h4 className="text-foreground/75">Total Price</h4>
          <p className="text-end">RM {order.total}</p>
          {order.requirements && order.requirements.length > 0 ? (
            <>
              <h4 className="text-foreground/75">Requirement</h4>
              <p className="text-end">{order.requirements}</p>
            </>
          ) : (
            ""
          )}
        </div>
        <Separator className="my-2" />
        <DialogFooter className="grid grid-cols-2 w-full">
          {order.fullfillmentStatus === "In Progress" && (
            <Button
              variant={"destructive"}
              className="w-[11rem]"
              onClick={() => onReject(order._id)}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Cancel Request"}
            </Button>
          )}
          <div className="w-[11rem] place-self-end">
            <ContactBtn
              receiver={order.serviceOwner.username}
              text="Contact Vendor"
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserOrderDetailDialog;
