"use client";

import { LinkIcon } from "@solar-icons/react/linear";
import Image from "next/image";
import { useState } from "react";

export function RemoteBookmarkIcon({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return <LinkIcon className="size-5" />;

  return (
    <Image
      src={src}
      alt=""
      width={20}
      height={20}
      unoptimized
      className="size-5 object-contain grayscale transition-[filter] group-hover:grayscale-0 group-focus-visible:grayscale-0 motion-reduce:transition-none"
      onError={() => setFailed(true)}
    />
  );
}
