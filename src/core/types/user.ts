import { Role } from "react-native"
import { UserNotificationOption } from "./userNotificationOption"


export type User = {
    id: number,
    name: string,
    phone: string,
    email: string,
    passwordHash: string,
    active: boolean,
    uniqueId: string,
    options: UserNotificationOption[],
    roleId: number,
    role: Role,
    subData: string,
    subStatus: SubStatus
}

export enum SubStatus {
    Test, Payed
}