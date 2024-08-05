import { api } from './api'
import { User } from '../../types/user'
import { Info } from '../../types/info'

export const infoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getContacts: builder.query<Info, void>({
            query: () => '/info/contacts',
            providesTags: ['info'],
        }),
        getPayment: builder.query<Info, void>({
            query: () => '/info/payment',
            providesTags: ['info'],
        }),
        getPolicy: builder.query<Info, void>({
            query: () => '/info/policy',
            providesTags: ['info'],
        }),
    }),
})

export const { useGetContactsQuery, useGetPolicyQuery, useGetPaymentQuery } = infoApi
