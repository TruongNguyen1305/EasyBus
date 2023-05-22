import { API } from "../base";

const paymentAPI = API.injectEndpoints({
    endpoints: (build) => ({
        getPaymentUrl: build.mutation<any,  {
            normalTicketCount: number,
            monthTicketCount: number,
            totalPrice: number
        }>({
            query: (credentials) => ({
                url: 'payment',
                method: 'POST',
                body: credentials,
            })
        })
    }),
    overrideExisting: true,
});




export const { useGetPaymentUrlMutation} = paymentAPI;