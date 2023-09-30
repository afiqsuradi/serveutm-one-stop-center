import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    currentPassword: z
      .string()
      .min(5, "Password should be at least 5 characters"),
    newPassword: z
      .string()
      .min(5, "Password should be at least 5 characters")
      .max(20, "Password should not exceed 20 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,20}$/,
        {
          message:
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const PasswordChangeFormStructResolver = zodResolver(schema);
export type PasswordChangeFormStruct = z.infer<typeof schema>;
