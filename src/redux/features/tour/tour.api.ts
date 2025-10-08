import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITour, ITourType } from "@/types";

const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  === Tour Type ===
    addTourType: builder.mutation<IResponse<ITourType>, Partial<ITourType>>({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR-TYPE"],
    }),

    getTourType: builder.query<ITourType[], void>({
      query: () => ({
        url: "/tour/tour-type",
        method: "GET",
      }),
      providesTags: ["TOUR-TYPE"],
      transformResponse: (response: IResponse<ITourType[]>) => response.data,
    }),

    deleteTourType: builder.mutation<IResponse<null>, string>({
      query: (tourTypeID) => ({
        url: `/tour/tour-type/${tourTypeID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR-TYPE"],
    }),

    //
    //  === Tour ===
    addTour: builder.mutation<IResponse<ITour>, FormData>({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR", "TOUR-TYPE"],
    }),

    getAllTour: builder.query<ITour[], unknown>({
      query: (params) => ({
        url: "/tour",
        params: params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITour[]>) => response.data,
      }),
    }),
});

export const {
  useAddTourTypeMutation,
  useGetTourTypeQuery,
  useDeleteTourTypeMutation,
  useAddTourMutation,
  useGetAllTourQuery,
} = tourApi;
