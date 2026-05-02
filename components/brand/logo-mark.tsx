import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  imageClassName?: string;
  decorated?: boolean;
};

export function LogoMark({ className, imageClassName, decorated = true }: LogoMarkProps) {
  if (!decorated) {
    return (
      <Image
        src="/logo.png"
        alt="Educrystal"
        width={3000}
        height={3000}
        priority={false}
        className={cn("h-full w-full object-contain", className, imageClassName)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-[1.6rem] border-2 border-outline bg-white shadow-[0_18px_0_rgba(255,199,84,0.18)]",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt="Educrystal"
        width={3000}
        height={3000}
        priority={false}
        className={cn("h-full w-full object-contain p-[10%]", imageClassName)}
      />
    </div>
  );
}
