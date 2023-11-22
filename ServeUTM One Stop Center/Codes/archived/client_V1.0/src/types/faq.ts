import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  question: z
    .string()
    .min(10, "Question should contain atleast 10 words")
    .trim(),
  answer: z
    .string()
    .min(30, "Question should contain atleast 30 words")
    .max(300, "Question should not exceed 300 characters"),
});
export const FaqStructResolver = zodResolver(schema);
export type FaqStruct = z.infer<typeof schema>;
