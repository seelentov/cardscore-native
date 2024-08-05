import { api } from './api'
import { EditUserNotificationOption, EditUserNotificationOptions } from '../../types/EditUserNotificationOption'
import { User } from '../../types/user'
import { AuthDto } from '../../types/Dtos/AuthDto'
import { CreateUserDto } from '../../types/Dtos/CreateUserDto'
import { League } from '../../types/league'
import { Game } from '../../types/game'
import { Notification } from '../../types/notification'

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<User, void>({
            query: () => '/auth/me',
            providesTags: ['auth'],
        }),
        getNotifications: builder.query<Notification[], void>({
            query: () => '/auth/notifications',
            providesTags: ['notifications'],
        }),
        updateNotif: builder.mutation<void, string>({
            query: (newToken) => ({
                url: `/auth/exponotif/${newToken}`,
                method: "PATCH",
            }),
            invalidatesTags:['notifications'],
        }),
        removeNotifications: builder.mutation<void, {gameUrl: string}>({
            query: ({gameUrl}) => ({
                url: `/auth/notifications/${gameUrl}`,
                method: "DELETE",
            }),
            invalidatesTags:['notifications'],
        }),
        getFavorites: builder.query<League[], void>({
            query: () => '/auth/favorites',
            providesTags: ['auth'],
        }),
        getFavoriteGames: builder.query<{league: League, game: Game}[], void>({
            query: () => '/auth/favorites/games',
            providesTags: ['auth'],
        }),
        login: builder.mutation<void, AuthDto>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            invalidatesTags:['auth'],
        }),
        signUp: builder.mutation<void, CreateUserDto>({
            query: (body) => ({
                url: "/auth/signup",
                method: "POST",
                body,
            }),
            invalidatesTags:['auth'],
        }),
        getNotificators: builder.query<EditUserNotificationOption[], void>({
            query: () => '/notification',
            providesTags: ['auth'],
        }),
        editNotificators: builder.mutation<EditUserNotificationOption[], EditUserNotificationOptions>({
            query: (form: EditUserNotificationOptions) => ({
                url: "/notification",
                method: "PATCH",
                body: form,
            }),
            invalidatesTags:['auth'],
        }),
        createNotificator: builder.mutation<void, string>({
            query: (name: string) => ({
                url: `/notification?name=${encodeURI(name)}`,
                method: "POST",
            }),
            invalidatesTags:['auth'],
        }),
        deleteNotificator: builder.mutation<void, string>({
            query: (name: string) => ({
                url: `/notification?name=${encodeURI(name)}`,
                method: "DELETE",
            }),
            invalidatesTags:['auth'],
        }),
    }),
})

export const { useGetMeQuery, useLoginMutation, useSignUpMutation, useGetFavoritesQuery, useCreateNotificatorMutation, useDeleteNotificatorMutation, useGetFavoriteGamesQuery, useGetNotificatorsQuery, useEditNotificatorsMutation, useGetNotificationsQuery, useRemoveNotificationsMutation, useUpdateNotifMutation } = authApi
