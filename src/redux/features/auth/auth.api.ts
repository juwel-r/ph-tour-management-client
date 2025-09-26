import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (credential) => ({
        url: "/auth/login",
        method: "POST",
        data: credential,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
