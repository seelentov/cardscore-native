import { api } from './api'
import { Reglament } from '../../types/reglament'

export const infoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getReglaments: builder.query<Reglament[], void>({
            query: () => '/reglament',
            providesTags: ['info'],
        }),
        getReglamentByName: builder.query<Reglament, {name: string}>({
            query: ({name}) => `/reglament/${encodeURI(name)}`,
            providesTags: ['info'],
        }),
        
    }),
})

export const { useGetReglamentsQuery, useGetReglamentByNameQuery } = infoApi
