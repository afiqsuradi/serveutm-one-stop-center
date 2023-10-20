import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserInfo } from "@/hooks/User/useGetUser";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { BiSolidUser } from "react-icons/bi";

interface Props {
  userData: UserInfo;
}

const AvatarCard = ({ userData }: Props) => {
  return (
    <Card className="w-full md:w-[350px]">
      <CardHeader className="overflow-hidden relative flex justify-center items-center">
        <div className="absolute w-full h-1/2 bg-primary top-0 left-0"></div>
        <div>
          <Avatar className="w-[4rem] h-[4rem] border-2 border-primary mt-10">
            <AvatarImage src={userData.profileImage} className="object-cover" />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle>{userData.name}</CardTitle>
        <CardDescription>@{userData.username}</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          <BiSolidUser className="text-xl" />
          <p className="text-base">Member since</p>
        </div>
        <p>
          {new Intl.DateTimeFormat("en-MY", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(new Date(userData.dateJoined))}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AvatarCard;
