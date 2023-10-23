import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { FaqType } from "@/interface/Service";
import { FaqStruct, FaqStructResolver } from "@/types/GigRule";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  data: FaqType;
}

const FaqAccordion = ({ data }: Props) => {
  const { service, setService } = useGig();
  const form = useForm<FaqStruct>({
    resolver: FaqStructResolver,
    defaultValues: { question: data.question, answer: data.answer },
  });
  const question = form.watch("question");
  const answer = form.watch("answer");

  const onDelete = () => {
    const newFaq = service.faq.filter(
      (faqData) => faqData.question !== data.question
    );
    setService({ ...service, faq: newFaq });
  };

  const onUpdate = (FormData: FaqStruct) => {
    const newFaq = service.faq.filter(
      (faqData) => faqData.question !== data.question
    );
    newFaq.push(FormData);
    setService((prev) => {
      return { ...prev, faq: newFaq };
    });
  };

  useEffect(() => {
    if (data) {
      form.setValue("question", data.question);
      form.setValue("answer", data.answer);
    }
  }, [data]);

  return (
    <AccordionItem value={data.question} className="border">
      <AccordionTrigger className="px-4">{data.question}</AccordionTrigger>
      <AccordionContent className="px-4 p-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onUpdate)}>
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
                type="button"
                variant={"destructive"}
                onClick={onDelete}
                className="w-[6rem]"
              >
                Delete
              </Button>
              <Button type="submit" className="w-[6rem]">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FaqAccordion;
