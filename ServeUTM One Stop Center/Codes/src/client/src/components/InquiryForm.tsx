import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoIosMail } from "react-icons/io";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { inquiryStruct, inquiryStructResolver } from "@/types/userDataRule";
import useSendInquiry from "@/hooks/useSendInquiry";
import { useEffect } from "react";
import Spinner from "./ui/spinner";

const InquiryForm = () => {
  const form = useForm<inquiryStruct>({
    resolver: inquiryStructResolver,
    defaultValues: { name: "", mail: "", message: "" },
  });
  const { send, isLoading, error, success } = useSendInquiry();

  const onSubmit = (data: inquiryStruct) => {
    send(data);
  };

  useEffect(() => {
    if (!isLoading && success) {
      form.reset();
    }
  }, [success, isLoading]);

  return (
    <Card className="md:w-[500px] border-2 bg-card my-6 self-center place-self-center">
      <CardHeader>
        <CardTitle>Send Inquiry</CardTitle>
        <CardDescription>
          Send us an inquiry, and our dedicated team will be happy to help you.
        </CardDescription>
        {!isLoading && error ? (
          <Alert className="text-start" variant={"destructive"}>
            <FaExclamation />
            <AlertTitle>Failed To Sent Message</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        {!isLoading && success ? (
          <Alert variant={"success"}>
            <AiFillCheckCircle className="w-4 h-4" />
            <AlertTitle>Email Sent</AlertTitle>
            <AlertDescription>
              Please check your email for further instruction
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="name"
                        placeholder="Name"
                        className="indent-5"
                        {...field}
                      />
                      <FaUser className="absolute text-lg left-2 top-1/2 -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="mail"
                        placeholder="Email"
                        className="indent-5"
                        {...field}
                      />
                      <IoIosMail className="absolute text-lg left-2 top-1/2 -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Message"
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InquiryForm;
