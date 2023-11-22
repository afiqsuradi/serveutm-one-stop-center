import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string()
    .min(5, "Name should be at least 5 characters")
    .max(50, "Name should not exceed 50 characters")
    .trim(),
  username: z
    .string()
    .min(5, "Username should be at least 5 characters")
    .max(20, "Username should not exceed 20 characters")
    .trim(),
  email: z.string().email("Invalid email format").trim().min(5).max(255),
});
export const ProfileUpdateFormStructResolver = zodResolver(schema);
export type ProfileUpdateFormStruct = z.infer<typeof schema>;
