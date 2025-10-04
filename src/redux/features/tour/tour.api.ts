import { baseApi } from "@/redux/baseApi";
import type { IResponse, IResponseArray, ITour, ITourType } from "@/types";


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
      transformResponse: (response: IResponse<ITourType>) =>
        Array.isArray(response.data) ? response.data : [response.data],
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
    addTour: builder.mutation<IResponseArray<ITour>, FormData>({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useGetTourTypeQuery,
  useDeleteTourTypeMutation,
  useAddTourMutation
} = tourApi;
