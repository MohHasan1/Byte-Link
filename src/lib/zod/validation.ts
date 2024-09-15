import { z } from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(1, "Please provide your real name."),
  username: z.string().min(1, "Username is required!"),
  email: z.string().email("Invalid email address!"),
  password: z.string().min(8, "Password must be at least 8 characters!"),
});
export type SignUpValidationProps = z.infer<typeof SignUpValidation>;

export const SignInValidation = z.object({
  email: z.string().email("Invalid email address!"),
  password: z.string().min(1, "Please enter your password!"),
});
export type SignInValidationProps = z.infer<typeof SignInValidation>;

export const CreatePostValidation = z.object({
  title: z.string().min(4).max(500),
  desc: z.string().min(4).max(2000),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(2200),
  tags: z.string(),
});
export type CPostValidationProps = z.infer<typeof CreatePostValidation>;
