import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import conference from "@/assets/conference.svg";
import { Link } from "react-router-dom";
import ROUTES from "@/constant/routes";
const BecomeSellerBanner = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-8 justify-center items-center p-8">
        <img src={conference} alt="Conference" className="w-[12rem]" />
        <p>Ready to earn on your own terms?</p>
        <Button className="max-w-[10rem]">
          <Link to={ROUTES.PROVIDER_REGISTER}>Become a seller</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BecomeSellerBanner;
