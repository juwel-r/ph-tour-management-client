import z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
  password: z.string().min(6, { error: "Password too short" }),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, { error: "Name is too short." }).max(50),
    email: z.email({ error: "Invalid email address." }),
    password: z.string().min(6, { error: "Password too short" }),
    confirmPassword: z.string().min(6, { error: "Password too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password not matched.",
    path: ["confirmPassword"],
  });
//used refine() to validate confirm password

//
export const otpSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
});

export const addTourSchema = z.object({
  title: z.string().min(5, { error: "Title is too short." }),
  division: z.string().min(1,{ error: "No division selected" }),
  tourType: z.string().min(1,{ error: "No division selected" }),
  costFrom: z.string().min(1,{ error: "Input a positive number." }),
});
