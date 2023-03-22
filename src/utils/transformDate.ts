export const transformDate = (d: string) => {
  const date = new Date(d); // convert the string to a date object
  const formattedDate = date.toLocaleDateString(); // convert the date to a local date format
  const [day, month, year] = formattedDate.split("/"); // split the date into day, month, and year components
  const formattedCreatedAt = `${day}/${month}/${year}`;
  return formattedCreatedAt;
};

export const getDetailedDateFormat = (date: string | undefined) => {
  if (!date) return "";
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDate;
};
