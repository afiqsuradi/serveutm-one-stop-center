import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z.string().min(5).max(50).trim(),
    username: z.string().min(5).max(20).trim(),
    email: z.string().email().trim().min(5).max(255),
    password: z.string().min(5).max(255),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const RegisterFormStructResolver = zodResolver(schema);
export type RegisterFormStruct = z.infer<typeof schema>;
