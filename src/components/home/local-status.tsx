import {Separator} from "@/components/ui/separator";
import {AnimatedTemperature} from "./animated-temperature";
import {location} from "@/config/location";
import {IntroItem, IntroItemContent, IntroItemIcon, IntroItemLink} from "./intro-item";
import {getTranslations} from "next-intl/server";
import {getBanyuwangiWeather} from "@/lib/weather";
import {WeatherIcon} from "./weather-icon";
import {MapPointIcon} from "./location-icons";
import {LocalTime} from "./local-time";

export async function LocalStatus({locale}: {locale: string}) {
  const [weather, t] = await Promise.all([
    getBanyuwangiWeather(locale), getTranslations({locale, namespace: "LocalStatus"}),
  ]);
  return (
    <div className="grid w-fit max-w-full grid-cols-1 items-start gap-4 rounded-2xl border border-border bg-background/60 p-4 text-sm sm:p-5 backdrop-blur-2xl backdrop-saturate-150 sm:w-fit sm:grid-cols-[max-content_minmax(0,max-content)] sm:gap-10">
      <div className="min-w-0 space-y-2">
        <IntroItem className="font-medium text-foreground">
          <IntroItemIcon aria-hidden="true"><MapPointIcon className="size-4" /></IntroItemIcon>
          <IntroItemContent>
            <IntroItemLink href={location.mapsUrl} aria-label={t("map", {location: location.address})}>{location.address}</IntroItemLink>
          </IntroItemContent>
        </IntroItem>
        <LocalTime timeZone={location.timeZone} />
      </div>
      <Separator className="data-horizontal:h-px sm:hidden" />
      <div className="flex min-w-0 flex-wrap items-start gap-x-3 gap-y-3 sm:gap-x-4">
        <div className="flex h-14 shrink-0 items-center">
          <WeatherIcon code={weather?.code ?? 802} night={weather?.night ?? false} />
        </div>
        <div className="min-w-0 space-y-2">
          <div className="flex min-h-6 flex-wrap items-center gap-2 text-sm leading-5 font-medium text-foreground">
            <AnimatedTemperature value={weather?.temperature ?? null} />
            {weather && (
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Separator render={<span />} orientation="vertical" aria-hidden="true" className="data-vertical:h-4 data-vertical:self-center" />
                <span className="inline-flex items-center gap-1">{t("feelsLike")} <span className="text-foreground"><AnimatedTemperature value={weather.feelsLike} /></span></span>
              </span>
            )}
          </div>
          <p className="flex min-h-6 items-center text-sm leading-5 text-muted-foreground">
            {weather ? weather.description.charAt(0).toLocaleUpperCase(locale) + weather.description.slice(1) : t("unavailable")}
          </p>
        </div>
      </div>
    </div>
  );
}
