export interface EditUserNotificationOptions{
    options: EditUserNotificationOption[]
}

export interface EditUserNotificationOption{
    name: string,
    cardCount: number,
    cardCountTwo: number,
    cardCountThree: number,
    active: boolean
}