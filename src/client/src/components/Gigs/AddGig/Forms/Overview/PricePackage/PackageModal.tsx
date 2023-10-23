import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  PackagePricingStruct,
  PackagePricingStructResolver,
} from "@/types/GigRule";
import { Textarea } from "@/components/ui/textarea";
import { useGig } from "@/hooks/Gigs/useGig";
import { PricingPackageType } from "@/interface/Service";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialValue?: PricingPackageType;
}

const PackageModal = ({ isOpen, setIsOpen, initialValue }: Props) => {
  const { service, setService } = useGig();
  const [error, setError] = useState("");
  const form = useForm<PackagePricingStruct>({
    resolver: PackagePricingStructResolver,
    defaultValues: initialValue || {
      title: "",
      description: "",
      price: 0,
    },
  });

  const desc = form.watch("description");

  const addPackage = (data: PackagePricingStruct) => {
    try {
      if (service.pricePackage.length >= 3)
        throw new Error("Only 3 price packages are allowed");
      const duplicate = service.pricePackage.filter(
        (pack) => pack.title === data.title
      );
      if (duplicate.length > 0)
        throw new Error("Price package with the same title arent allowed");
      setService((prev) => {
        return { ...prev, pricePackage: [...prev.pricePackage, data] };
      });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    if (initialValue) {
      form.setValue("title", initialValue.title);
      form.setValue("description", initialValue.description);
      form.setValue("price", initialValue.price);
    }
    setError("");
  }, [initialValue]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(addPackage)}>
            <DialogHeader>
              <DialogTitle>New Price Package</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {error.length > 0 && (
                <Alert className="text-start" variant={"destructive"}>
                  <FaExclamation />
                  <AlertTitle>Failed to add package</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        defaultValue={initialValue ? initialValue.title : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="resize-none"
                        defaultValue={
                          initialValue ? initialValue.description : ""
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Tell about your package in detail ({desc.length}/300)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        defaultValue={initialValue ? initialValue.price : 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PackageModal;
