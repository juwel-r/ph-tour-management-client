import { baseApi } from "@/redux/baseApi";

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

    getDivision: builder.query({
      query: () => ({
        url: "/division",
        method:"GET"
      }),
      transformResponse:(response)=> response.data,
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
