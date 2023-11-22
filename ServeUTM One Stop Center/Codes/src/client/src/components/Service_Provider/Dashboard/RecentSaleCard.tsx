import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrderType } from "@/interface/Orders";
import OrderDetailDialog from "./OrderDetailDialog";

interface Props {
  order: OrderType;
}

const RecentSaleCard = ({ order }: Props) => {
  return (
    <OrderDetailDialog order={order}>
      <div className="hover:bg-secondary rounded-lg p-4 hover:cursor-pointer">
        <div className="grid items-center grid-cols-2 w-full">
          <div className="flex items-center gap-2">
            <Avatar className="w-[2.2rem] h-[2.2rem]">
              <AvatarImage
                src={order.user.profileImage}
                className="object-cover"
              />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3>{order.user.name}</h3>
              <p className="text-foreground/75 font-thin text-sm">
                {order.service.title}
              </p>
            </div>
          </div>
          <div className="place-self-end flex flex-col text-end">
            <h3>
              {order.package.title} (x{order.quantity})
            </h3>
            <p className="text-foreground/75 font-thin text-sm">
              RM {order.total}
            </p>
          </div>
        </div>
      </div>
    </OrderDetailDialog>
  );
};

export default RecentSaleCard;
