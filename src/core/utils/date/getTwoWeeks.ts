function getTwoWeeks(): Date[]{
    const today = new Date();
    const weekDates = [];
  
    for (let i = 0; i < 20; i++) {
      const date = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
      weekDates.push(date);
    }

    for (let i = 1; i <= 4; i++) {
      const date = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
      weekDates.unshift(date);
    }
  
    return weekDates;
}

export default getTwoWeeks;