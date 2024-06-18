export function formatDate(timestamp: number) {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Get the year, month, day, hours, minutes, and seconds from the Date object
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Format the date string in the desired format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
