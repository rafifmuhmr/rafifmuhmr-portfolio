import Image from "next/image"
import { useLocale } from "next-intl"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/vendor/chanhdai/utils/url"

import { UTM_PARAMS } from "@/vendor/chanhdai/config/site"

import type { Experience } from "../../types/experiences"
import { ExperiencePositionItem } from "./experience-position-item"

export function ExperienceItem({ experience }: { experience: Experience }) {
  const locale = useLocale()

  return (
    <div
      id={`experience-${experience.id}`}
      className="scroll-mt-14 space-y-5"
    >
      <div className="group/company flex items-start gap-3 sm:items-center">
        <div className="flex size-6 shrink-0 items-center justify-center select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-5">
          {experience.companyLogo ? (
            <>
              <CompanyLogo src={experience.companyLogo} className={experience.companyLogoDark && "dark:hidden"} />
              {experience.companyLogoDark && <CompanyLogo src={experience.companyLogoDark} className="hidden dark:block" />}
            </>
          ) : (
            (experience.companyIcon ?? (
              <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            ))
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-x-3 gap-y-1 pr-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-xl/6 font-medium">
            {experience.companyWebsite ? (
              <a
                className="decoration-1 underline-offset-4 [text-decoration-skip-ink:none] hover:underline focus-visible:underline"
                href={addQueryParams(experience.companyWebsite, UTM_PARAMS)}
                target="_blank"
                rel="noopener"
              >
                {experience.companyName}
              </a>
            ) : (
              experience.companyName
            )}
          </h3>

          {(experience.location || experience.isCurrentEmployer) && (
            <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              {experience.location && (
                <span>
                  {experience.location}
                  {experience.locationType && ` (${experience.locationType})`}
                </span>
              )}
              {experience.isCurrentEmployer && (
                <span className="inline-flex shrink-0 items-center">
                  <span className="sr-only">{locale === "id" ? "Masih aktif" : "Currently active"}</span>
                  <span aria-hidden className="relative grid size-2.5 place-items-center">
                    <span className="absolute size-2.5 rounded-full bg-brand opacity-50 motion-safe:animate-ping" />
                    <span className="relative size-1.5 rounded-full bg-brand" />
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  )
}

function CompanyLogo({ src, className }: { src: string; className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={24}
      height={24}
      unoptimized
      className={cn(
        "size-6 object-contain opacity-60 grayscale transition-[filter,opacity] duration-300 group-hover/company:opacity-100 group-hover/company:grayscale-0 group-focus-within/company:opacity-100 group-focus-within/company:grayscale-0 motion-reduce:transition-none",
        className
      )}
    />
  )
}
