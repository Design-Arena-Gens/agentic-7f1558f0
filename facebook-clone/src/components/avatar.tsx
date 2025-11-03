"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  ring?: boolean;
};

export function Avatar({ src, alt, size = 44, className, ring }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted",
        ring && "ring-2 ring-offset-2 ring-accent ring-offset-surface",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
