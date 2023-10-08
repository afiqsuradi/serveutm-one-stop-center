import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z
    .string()
    .min(4, "Package Title should be at least 4 characters")
    .max(15, "Package Title should not exceed 15 characters")
    .trim(),
  description: z
    .string()
    .min(15, "Package Description should be at least 15 characters")
    .max(120, "Package Description should not exceed 120 characters")
    .trim(),
  price: z
    .number({
      invalid_type_error: "Package Price Should be whole number",
    })
    .min(2, "Package Price must be atleast RM2"),
});
export const PackagePricingStructResolver = zodResolver(schema);
export type PackagePricingStruct = z.infer<typeof schema>;
