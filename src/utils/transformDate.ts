export const transformDate = (d: string) => {
  const date = new Date(d); // convert the string to a date object
  const formattedDate = date.toLocaleDateString(); // convert the date to a local date format
  const [day, month, year] = formattedDate.split("/"); // split the date into day, month, and year components

  const formattedCreatedAt = `${day}/${month}/${year}`;
  return formattedCreatedAt;
};
