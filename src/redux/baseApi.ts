import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
    reducerPath:"baseApi",
    baseQuery:axiosBaseQuery(),
    // baseQuery: fetchBaseQuery({baseUrl:env.baseUrl, credentials:"include"}), 
    // // if not used axios then for access cookie use "credentials:include"
    tagTypes:["USER","TOUR","DIVISION"],
    endpoints:()=>({})
})
