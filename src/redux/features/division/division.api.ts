import { baseApi } from "@/redux/baseApi";
import type { IDivision, IResponse } from "@/types";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (formData) => ({
        url: "/division/create",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    getDivision: builder.query<IDivision[], void>({
      query: () => ({
        url: "/division",
        method:"GET"
      }),
      transformResponse:(response:IResponse<IDivision[]>)=> response.data,
      providesTags: ["DIVISION"],
    }),

    deleteDivision: builder.mutation({
      query: (id) => ({
        url: `/division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const {
  useAddDivisionMutation,
  useGetDivisionQuery,
  useDeleteDivisionMutation,
} = divisionApi;
