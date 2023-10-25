import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PricingPackageType } from "@/interface/Service";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import NotesForm from "./NotesForm";
import usePlaceOrder from "@/hooks/Purchase/usePlaceOrder";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import Spinner from "@/components/ui/spinner";

interface Props {
  pack: PricingPackageType;
  isOpen: boolean;
  serviceId: string;
  setIsOpen: (open: boolean) => void;
}

const PrePurchase = ({ isOpen, setIsOpen, pack, serviceId }: Props) => {
  const { placeOrder, isLoading, error } = usePlaceOrder();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(pack.price);
  const [note, setNote] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);

  const onIncrease = () => {
    setQuantity(() => quantity + 1);
  };

  const onDecrease = () => {
    if (quantity !== 1) {
      setQuantity(() => quantity - 1);
    }
  };

  const onPlaceOrder = () => {
    placeOrder({
      serviceId,
      packageTitle: pack.title,
      quantity,
      note,
    });
  };

  useEffect(() => {
    setTotal(pack.price * quantity);
  }, [quantity]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Order options</SheetTitle>
          <Separator />
          <div className="flex flex-col gap-8 h-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <p>{pack.title}</p>
                  <p className="font-light text-lg">RM {total}</p>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 break-words">
                {pack.description}
                <Separator className="my-2 mt-4" />
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <h3>Gig Quantity</h3>
                  <div className="flex gap-4">
                    <button onClick={onDecrease}>
                      <AiOutlineMinusCircle className="text-foreground text-2xl hover:cursor-pointer hover:text-foreground/75" />
                    </button>
                    <p className="text-foreground/75 texl-xl">{quantity}</p>
                    <button onClick={onIncrease}>
                      <AiOutlinePlusCircle className="text-foreground text-2xl hover:cursor-pointer hover:text-foreground/75" />
                    </button>
                  </div>
                </div>
              </CardFooter>
            </Card>
            <div className="flex flex-col gap-4">
              {noteOpen && (
                <NotesForm
                  notes={note}
                  setNotes={setNote}
                  setIsOpen={setNoteOpen}
                />
              )}
              {noteOpen || (
                <Button
                  className="w-full"
                  variant={"secondary"}
                  onClick={() => setNoteOpen(true)}
                >
                  Add Note
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>
        <SheetFooter className="w-full h-full">
          <div className="mt-auto space-y-8 w-full">
            {error && (
              <Alert className="text-start" variant={"destructive"}>
                <FaExclamation />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={onPlaceOrder}
            >
              {isLoading ? <Spinner /> : `Checkout (RM ${total})`}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PrePurchase;
