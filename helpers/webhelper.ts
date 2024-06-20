export function convertUnixTimestampToSwedishDate(unixTimestamp: any) {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Stockholm",
  };

  return new Intl.DateTimeFormat("sv-SE", options as any).format(date);
}

export function convertUnixTimestampToSweDateAndMonth(unixTimestamp: any) {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
  const options = {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Stockholm",
  };
  return new Intl.DateTimeFormat("sv-SE", options as any).format(date);
}
