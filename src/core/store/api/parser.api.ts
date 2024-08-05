
import { Game } from '../../types/game';
import { League, LeagueIncludeGames } from '../../types/league';
import { Player } from '../../types/player';
import { api, Response } from './api'

export const parserApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLeagues: builder.query<League[], void>({
            query: () => '/parser/leagues/',
            providesTags: ['parserLeagues'],
        }),
        getLeague: builder.query<League, { id: number }>({
            query: ({ id }) => `/parser/leagues/${id}`,
            providesTags: ['parserLeague'],
        }),
        getGames: builder.query<LeagueIncludeGames, { url: string }>({
            query: ({ url }) => `/parser/games/${url}`,
            providesTags: ['parserGames'],
        }),
        getGame: builder.query<Game, { leagueUrl: string; gameUrl: string }>({
            query: ({ leagueUrl, gameUrl }) => `/parser/game/${leagueUrl}/${gameUrl}`,
            providesTags: ['parserGame'],
        }),
        getPlayer: builder.query<Player, { playerUrl: string, leagueUrl: string }>({
            query: ({ playerUrl, leagueUrl }) => `/parser/player/${leagueUrl}/${playerUrl}`,
            providesTags: ['parserGame'],
        }),
    }),
})

export const { useGetLeaguesQuery, useGetLeagueQuery, useGetGamesQuery, useGetGameQuery, useGetPlayerQuery } = parserApi
