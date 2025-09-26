/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Github from "@/assets/icons/Github";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/PasswordField";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const registerSchema = z
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

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  /**
   //need to update arguments type from "React.ComponentProps" to "React.HTMLAttributes<HTMLDivElement>"
   Need to explore more react hook form "Raw/Original"
   */

   const [register]=useRegisterMutation()


  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // const onSubmit:SubmitHandler<FieldValues> = (data) => {
  //   console.log(data);
  // };
  //different type used here-> infered from zod types
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo ={
      name:data.name,
      email:data.email,
      password:data.password
    }
    console.log({userInfo});
    
    try {
      const result = await register(userInfo).unwrap();
      toast.success(result.message);
      
    } catch (error:any) {
      console.log(error);
      toast.error(error.data.message)
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>

      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                    {/* here i used another password field from origin ui to show/hide password, must need to pass props */}
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display confirm password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <Github />
          Login with GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login">
          <span className="underline font-bold">Login</span>
        </Link>
      </div>
    </div>
  );
}
