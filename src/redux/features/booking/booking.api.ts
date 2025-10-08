import { baseApi } from "@/redux/baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createBooking:builder.mutation({
            query:(data)=>({
                url:"/booking",
                method:"POST",
                data
            })
        })
    })
})


export const  {useCreateBookingMutation}= bookingApi