import { League } from "./league";

export interface Reglament{
    id: number,
    name: string,
    text: string,
    leagueId: number,
    league: League,
    active: boolean
}