import RegisterFormWrapper from "@/components/Service_Provider/Register/RegisterFormWrapper";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGig } from "@/hooks/Gigs/useGig";
import { FaqStruct, FaqStructResolver } from "@/types/GigRule";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FaqAccordion from "./FaqAccordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";

const FaqForm = () => {
  const [error, setError] = useState("");
  const { service, setService } = useGig();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FaqStruct>({
    resolver: FaqStructResolver,
    defaultValues: { question: "", answer: "" },
  });
  const question = form.watch("question");
  const answer = form.watch("answer");

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    form.reset();
    setIsOpen(false);
  };

  const addNewFaq = (data: FaqStruct) => {
    setError("");
    if (
      service.faq.filter((faqData) => faqData.question === data.question)
        .length > 0
    ) {
      setError("An FAQ with same question are not allowed");
    } else {
      setService((prev) => {
        return { ...prev, faq: [...prev.faq, data] };
      });
      onClose();
    }
  };

  useEffect(() => {
    const newFaq = service.faq.filter((faqData) => faqData.question.length > 0);
    setService({ ...service, faq: newFaq });
  }, []);

  return (
    <RegisterFormWrapper title="Frequently Asked Questions (FAQ)">
      {error.length > 0 && (
        <Alert className="text-start mb-6" variant={"destructive"}>
          <FaExclamation />
          <AlertTitle>Failed to add Faq</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-6">
        {isOpen ? (
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(addNewFaq)}>
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Add a Question: i.e. Do you translate english well?"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-end">
                      <FormMessage className="mr-auto" />
                      {question.length}/70
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Add an Answer: i.e. Yes, I also translate from English to Malay"
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-end">
                      <FormMessage className="mr-auto" />
                      {answer.length}/500
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-6">
                <Button
                  onClick={onClose}
                  type="button"
                  onClickCapture={onClose}
                  variant={"destructive"}
                  className="w-[6rem]"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-[6rem]">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Button onClick={onOpen} className="w-[6rem] ml-auto">
            Add Faq
          </Button>
        )}
        <Accordion type="single" collapsible className="w-full">
          {service.faq.map((faqData) => {
            return <FaqAccordion data={faqData} key={faqData.question} />;
          })}
        </Accordion>
      </div>
    </RegisterFormWrapper>
  );
};

export default FaqForm;
