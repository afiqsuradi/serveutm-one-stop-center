import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    password: z
      .string()
      .min(5, "Password should be at least 5 characters")
      .max(20, "Password should not exceed 20 characters")
      .regex(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, {
        message:
          "Password must contain at least 1 uppercase, 1 lowercase, 1 number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const PasswordResetFormStructResolver = zodResolver(schema);
export type PasswordResetFormStruct = z.infer<typeof schema>;
