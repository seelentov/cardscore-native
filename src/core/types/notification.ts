import { GameActionBase } from "./gameAction"

export type Notification = GameActionBase & {
    id: number,
    userId: string,
    gameUrl: string,
    name: string,
    playerUrl: string,
    playerName: string,
    playerUrl2: string
    playerName2: string,

}