function convertToWeekDay(date: Date): string {
    const day = date.getDay() - 1

    switch (day) {
        case 0:
            return 'ПН'
        case 1:
            return 'ВТ'
        case 2:
            return 'СР'
        case 3:
            return 'ЧТ'
        case 4:
            return 'ПТ'
        case 5:
            return 'СБ'
        default:
            return 'ВС'
    }
}

export default convertToWeekDay