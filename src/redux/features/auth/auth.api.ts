import { baseApi } from "@/redux/baseApi";
import type {
  ILogin,
  ILoginResponse,
  IRegister,
  IResponse,
  ISendOtp,
  IUser,
  IVerifyOtp,
} from "@/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse<IUser>, IRegister>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    login: builder.mutation<IResponse<ILoginResponse>, ILogin>({
      query: (credential) => ({
        url: "/auth/login",
        method: "POST",
        data: credential,
      }),
    }),

    sendOTP: builder.mutation<IResponse<null>, ISendOtp>({
      query: (email) => ({
        url: "/otp/send",
        method: "POST",
        data: email,
      }),
    }),

    verifyOTP: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (otpInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: otpInfo,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
} = authApi;
