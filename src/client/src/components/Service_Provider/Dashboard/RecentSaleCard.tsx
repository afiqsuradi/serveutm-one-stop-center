import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrderType } from "@/interface/Orders";

interface Props {
  order: OrderType;
}

const RecentSaleCard = ({ order }: Props) => {
  return (
    <div className="hover:bg-secondary rounded-lg p-4 hover:cursor-pointer">
      <div className="grid items-center grid-cols-[2fr_1fr] w-full">
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
        <div className="flex flex-col">
          <h3>
            {order.package.title} (x{order.quantity})
          </h3>
          <p className="text-foreground/75 font-thin text-sm">
            RM {order.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentSaleCard;
