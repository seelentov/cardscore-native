import { Game } from "./game";
import { Reglament } from "./reglament";

export interface League {
    id: number,
    title: string,
    country: string,
    reglamentId: number,
    reglament: Reglament,
    startDate: string,
    endDate: string,
    url: string,
    active: boolean,
    gamesCount: number
}

export interface LeagueIncludeGames{
    id: number,
    title: string,
    country: string,
    games: Game[]
    startDate: string,
    endDate: string,
    url: string,
    active: boolean,
}