import "server-only";
import {location} from "@/config/location";

export type Weather = {temperature: number; feelsLike: number | null; description: string; code: number; night: boolean};

export async function getBanyuwangiWeather(locale: string): Promise<Weather | null> {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) return null;
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.search = new URLSearchParams({
    lat: String(location.latitude), lon: String(location.longitude), appid: key,
    units: "metric", lang: locale === "id" ? "id" : "en",
  }).toString();
  try {
    const response = await fetch(url, {next: {revalidate: 600}, signal: AbortSignal.timeout(5000)});
    if (!response.ok) return null;
    const data = await response.json();
    const condition = data.weather?.[0];
    if (!Number.isFinite(data.main?.temp) || !Number.isInteger(condition?.id) || typeof condition?.description !== "string") return null;
    return {temperature: Math.round(data.main.temp), feelsLike: Number.isFinite(data.main.feels_like) ? Math.round(data.main.feels_like) : null, description: condition.description, code: condition.id, night: String(condition.icon).endsWith("n")};
  } catch {
    return null;
  }
}
