import { GameAction } from "./gameAction";
import { Team } from "./team";

export interface Game{
    teams: Team[],
    time?: string,
    actions: GameAction[],
    dateTime: string,
    url: string,
    activeGame: boolean,
    gameTime: string,
    finishedToday: boolean
    isToday: boolean,
    isStopped: boolean
}