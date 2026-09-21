// ponytail: pin timeZone to UTC so server (Vercel, UTC) and client
// (visitor's local timezone) render the exact same string for date-only
// ISO strings like "2026-07-30" — without this, a client in Argentina
// (UTC-3) rolls the date back a day vs. the server, causing a React
// hydration text mismatch (#418) that breaks hydration for the rest of
// the page.
export function formatDate(
  date: string,
  month: "short" | "long" = "short",
): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month,
    year: "numeric",
    timeZone: "UTC",
  });
}
