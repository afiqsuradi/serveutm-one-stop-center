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
  password: z
    .string()
    .min(5, "Password should be at least 5 characters")
    .max(20, "Password should not exceed 20 characters")
    .regex(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, {
      message:
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number",
    }),
});

const loginSchema = z.object({
  username: schema.shape.username,
  password: schema.shape.password,
});
export const LoginStructResolver = zodResolver(loginSchema);
export type LoginStruct = z.infer<typeof loginSchema>;

const registerSchema = z
  .object({
    name: schema.shape.name,
    username: schema.shape.username,
    email: schema.shape.email,
    password: schema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const RegisterStructResolver = zodResolver(registerSchema);
export type RegisterStruct = z.infer<typeof registerSchema>;
