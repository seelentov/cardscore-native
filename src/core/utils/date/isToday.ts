import compareDate from "./compareDate";

function isToday(date: Date): boolean {
    const today = new Date();
    return compareDate(today, date)
}

export default isToday
