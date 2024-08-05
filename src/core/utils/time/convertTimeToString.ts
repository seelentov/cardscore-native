const convertTimeToString = (ms: number): string => {
    // Преобразовать миллисекунды в секунды
  let seconds = ms / 1000;

  // Получить часы
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  // Получить минуты
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // Форматировать время в виде "HH:MM"
  return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
}

export default convertTimeToString