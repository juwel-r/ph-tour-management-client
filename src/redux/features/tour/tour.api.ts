import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ITour } from "@/types/tour.types";

const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation<IResponse<ITour>, Partial<ITour>>({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR"],
    }),

    getTourType: builder.query<ITour[], void>({
      query: () => ({
        url: "/tour/tour-type",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITour>) =>
        Array.isArray(response.data) ? response.data : [response.data],
    }),
  }),
});

export const { useAddTourTypeMutation, useGetTourTypeQuery } = tourApi;
