import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z
    .string()
    .min(4, "Title should be at least 4 characters")
    .max(15, "Title should not exceed 15 characters")
    .trim(),
  description: z
    .string()
    .min(15, "Description should be at least 15 characters")
    .max(120, "Description should not exceed 120 characters")
    .trim(),
  price: z.number(),
});
export const PackagePricingStructResolver = zodResolver(schema);
export type PackagePricingStruct = z.infer<typeof schema>;
