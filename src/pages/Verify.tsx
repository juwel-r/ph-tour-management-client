import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/utils/zodSchema";
import type z from "zod";
import { Dot } from "lucide-react";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

export default function Verify() {
  const location = useLocation();
  const [email] = useState(location.state);
  const [confirm, setConfirm] = useState(false);
  const [sendOTP] = useSendOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/");
  //   }
  // }, [email, navigate]);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof otpSchema>) => {
    const toastId = toast.loading("OTP Sending...");
    const data = {
      email,
      otp: value.pin,
    };
    try {
      const result = await verifyOTP(data).unwrap();
      console.log(result);
      toast.success(result.message, {id:toastId});
      setConfirm(true);
    } catch (error) {
      console.log(error);
      toast.error("OTP sending failed.",{id:toastId});
    }
  };

  const handleSendOtp = async () => {
    const toastId = toast.loading("OTP Sending...");
    try {
      const result = await sendOTP({ email: email }).unwrap();
      console.log(result);
      toast.success(result.message, {id:toastId});
      setConfirm(true);
    } catch (error) {
      console.log(error);
      toast.error("OTP sending failed.", {id:toastId});
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      {confirm ? (
        <Card>
          <CardHeader>
            <CardTitle>Verify your email address!</CardTitle>
            <CardDescription>Please enter 6 digit OTP</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input OTP</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="sr-only">
                        Please enter the OTP sent to email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Send OTP to email</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSendOtp} className="w-[300px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
