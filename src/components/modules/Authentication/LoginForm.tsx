/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router";
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
import { toast } from "sonner";
import { authApi, useLoginMutation } from "@/redux/features/auth/auth.api";
import { loginSchema } from "@/utils/zodSchema";
import Google from "@/assets/icons/Google";
import env from "@/config/env.config";
import { useAppDispatch } from "@/redux/hook";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const location = useLocation();
  const dispatch = useAppDispatch();

  console.log(location.state);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const credential = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await login(credential).unwrap();
      toast.success(result.message);

      dispatch(authApi.util.invalidateTags(["USER"])); //if i don't add this, in checkAuthorization instantly data or data.role is show undefined so again come back in login so when i invalidateTags then again refetch user so then show data

      navigate(location.state || "/");
    } catch (error: any) {
      console.log(error);

      if (error.data.message == "User email is not verified.") {
        navigate("/verify", { state: credential.email });
      }
      toast.error(error.data.message || error.data);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <Button
          onClick={() => window.open(`${env.baseUrl}/auth/google`)}
          variant="outline"
          className="w-full"
        >
          <Google />
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?
        <Link to="/register">
          <span className="underline">Register</span>
        </Link>
      </div>
    </div>
  );
}
