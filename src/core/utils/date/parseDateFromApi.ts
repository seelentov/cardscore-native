function parseDateFromApi(dateString: string): Date {
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;  // Months are 0-indexed in JavaScript
  const day = parseInt(dateParts[2].split('T')[0]);
  return new Date(year, month, day);
}


export default parseDateFromApi