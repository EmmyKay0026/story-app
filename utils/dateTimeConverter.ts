export function convertDateFormat(input: string): string | Date {
  // Check if input matches the custom DB-like format: YYYY-MM-DD HH:mm:ss
  const dbFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (dbFormatRegex.test(input)) {
    // Convert to JS Date string
    const [datePart, timePart] = input.split(" ");
    const isoString = `${datePart}T${timePart}`; // make it ISO-compliant
    const date = new Date(isoString);
    return date; // e.g. "Wed Sep 03 2025 15:15:10 GMT+0100 (West Africa Standard Time)"
  }

  // Otherwise, try to parse as a JS Date string
  const parsedDate = new Date(input);
  if (!isNaN(parsedDate.getTime())) {
    // Convert to YYYY-MM-DD HH:mm:ss
    const pad = (n: number) => n.toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const month = pad(parsedDate.getMonth() + 1);
    const day = pad(parsedDate.getDate());
    const hours = pad(parsedDate.getHours());
    const minutes = pad(parsedDate.getMinutes());
    const seconds = pad(parsedDate.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  throw new Error("Invalid date format provided.");
}

export function convertDateToDateType(input: string): Date {
  // Check if input matches the custom DB-like format: YYYY-MM-DD HH:mm:ss
  const dbFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (dbFormatRegex.test(input)) {
    // Convert to JS Date string
    const [datePart, timePart] = input.split(" ");
    const isoString = `${datePart}T${timePart}`; // make it ISO-compliant
    const date = new Date(isoString);
    return date; // e.g. "Wed Sep 03 2025 15:15:10 GMT+0100 (West Africa Standard Time)"
  }

  throw new Error("Invalid date format provided.");
}
