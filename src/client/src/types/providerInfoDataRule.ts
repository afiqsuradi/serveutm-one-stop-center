import { languageLevel, skillLevel } from "@/interface/Provider";
import { z } from "zod";

export const providerDescriptionRule = z
  .string()
  .min(100, "Description must be atleast 100 characters")
  .max(700, "Description must not exceed 700 characters.");

export const providerSkillsRule = z.object({
  name: z
    .string()
    .min(4, "Skill name must be atleast 4 characters")
    .max(32, "Skill name must not exceed 32 characters."),
  level: z.enum(skillLevel),
});

export const providerLanguageRule = z.object({
  name: z.string(),
  level: z.enum(languageLevel),
});

export const linkRule = z.string().url("Please provide valid url");
