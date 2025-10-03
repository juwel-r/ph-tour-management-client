import { baseApi } from "@/redux/baseApi";
import type { IAddDivision, IDivision, IResponse } from "@/types";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation<IResponse<IDivision>,IAddDivision>({
      query: (data) => ({
        url: "/division/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    getDivision: builder.query({
      query: () => ({
        url: "/division",
        method:"GET"
      }),
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
