function compareDate(date: Date, date2: Date): boolean {
    if(!date || !date2){
        return false;
    }

    return date2.getDate() === date.getDate() &&
        date2.getMonth() === date.getMonth() &&
        date2.getFullYear() === date.getFullYear();
}

export default compareDate