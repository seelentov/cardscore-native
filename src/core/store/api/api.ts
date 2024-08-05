import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRejected, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Alert } from 'react-native';

export const BASE_URL = 'https://cardscore.ru'
export const API_URL = BASE_URL + '/api'
export const API_KEY = "7230564015:AAFCdo1DLXMV6KbEC_ZP4izb0fu8XVKyMek"

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next: any) => (action: any) => {
    if (isRejected(action)) {
      const error = `${action.meta.baseQueryMeta.request.url.replace(API_URL, "")}\n${JSON.stringify(action.error)}`
      Alert.alert("ERROR", error)
    }
    return next(action);
  };

export interface Response<T> {
  result: T
}

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['parserLeagues', "parserLeague", "parserGames", "auth", "parserGame", "info", "notifications"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as any).auth.token || await AsyncStorage.getItem("token")
      headers.set('Authorization', token);
      headers.set('Content-Type', "application/json")
      headers.set('ApiKey', API_KEY)
      return headers
    }
  }),
  endpoints: builder => ({
    base: builder.query<any, void>({
      query: () => '/',
      providesTags: []
    }),
  }),
})
export const { useBaseQuery } = api
