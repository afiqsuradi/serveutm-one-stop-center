import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  question: z
    .string()
    .min(10, "Question should contain atleast 10 words")
    .trim(),
  answer: z
    .string()
    .min(15, "Answer should be 30 - 300 words")
    .max(120, "Answer should be 30 - 300 words")
    .trim(),
});
export const FaqFormStructResolver = zodResolver(schema);
export type FaqFormStruct = z.infer<typeof schema>;
