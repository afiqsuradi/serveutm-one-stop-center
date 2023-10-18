import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string()
    .min(5, "Name should be at least 5 characters")
    .max(50, "Name should not exceed 50 characters")
    .trim(),
  email: z.string().email("Invalid email format").trim().min(5).max(255),
  message: z.string().min(10).max(255),
});
export const InquiryFormStructResolver = zodResolver(schema);
export type InquiryFormStruct = z.infer<typeof schema>;
