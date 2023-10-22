import { GigsTypeOption } from "@/interface/Service";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const GigTitleRule = z
  .string()
  .min(10, "Gig's title must be atleast 10 characters")
  .max(70, "Gig's title must not exceed 70 characters");

export const GigCategoryRule = z.enum(GigsTypeOption);

const faqSchema = z.object({
  question: z
    .string()
    .min(10, "Question should contain atleast 10 words")
    .trim(),
  answer: z
    .string()
    .min(30, "Question should contain atleast 30 words")
    .max(300, "Question should not exceed 300 characters"),
});
export const FaqStructResolver = zodResolver(faqSchema);
export type FaqStruct = z.infer<typeof faqSchema>;

const inputPriceRule = z.preprocess(
  (value) => parseFloat(value as string),
  z
    .number({ invalid_type_error: "Package Price Should be whole number" })
    .min(2, "Package Price must be atleast RM2")
);

const pricePackageSchema = z.object({
  title: z
    .string()
    .min(4, "Package Title should be at least 4 characters")
    .max(15, "Package Title should not exceed 15 characters")
    .trim(),
  description: z
    .string()
    .min(15, "Package Description should be at least 15 characters")
    .max(300, "Package Description should not exceed 300 characters")
    .trim(),
  price: inputPriceRule,
});
export const PackagePricingStructResolver = zodResolver(pricePackageSchema);
export type PackagePricingStruct = z.infer<typeof pricePackageSchema>;
