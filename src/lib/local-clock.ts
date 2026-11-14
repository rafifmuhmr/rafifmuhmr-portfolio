export function computeLocalClock(now: Date, timeZone: string, viewerOffset: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  const offset = new Intl.DateTimeFormat("en-US", {timeZone, timeZoneName: "shortOffset"})
    .formatToParts(now).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const match = offset.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);
  const targetOffset = match ? (match[1] === "+" ? 1 : -1) * (Number(match[2]) * 60 + Number(match[3] ?? 0)) : 0;
  return {hour: part("hour"), minute: part("minute"), second: part("second"), period: part("dayPeriod"), difference: targetOffset - viewerOffset};
}
