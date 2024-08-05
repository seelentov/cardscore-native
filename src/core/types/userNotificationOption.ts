import { User } from "./user";

export interface UserNotificationOption {
    Id: number;
    userId: number;
    user: User;
    name: string;
    cardCount: number;
    cardCountTwo: number,
    cardCountThree: number,
    active: boolean;
}

export interface UserNotificationOptionResponse {
    name: string;
    cardCount: number;
    cardCountTwo: number,
    cardCountThree: number,
    active: boolean;
}