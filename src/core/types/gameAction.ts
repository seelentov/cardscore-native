import { Player } from "./player";

export type GameAction = GameActionBase & {
    player:Player,
    player2:Player,
}

export interface GameActionBase{
    time: string,
    leftTeam: boolean
    actionType: GameActionType,
}

export enum GameActionType {
    None,
    YellowCard,
    RedCard,
    YellowRedCard,
    Switch
}