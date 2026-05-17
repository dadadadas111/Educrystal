function fmtGoogleDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export function openGoogleCalendar(title: string, description: string, start: Date, end: Date) {
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", title);
  url.searchParams.set("dates", `${fmtGoogleDate(start)}/${fmtGoogleDate(end)}`);
  url.searchParams.set("details", description);
  window.open(url.toString(), "_blank");
}
