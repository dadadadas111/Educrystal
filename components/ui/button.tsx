import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = ButtonBaseProps &
  LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    href: LinkProps["href"];
  };

type NativeButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-2 border-white/80 bg-gradient-to-b from-gold/95 via-accent-soft to-accent text-text shadow-crystal transition-all duration-200 hover:-translate-y-1 hover:brightness-105 active:translate-y-0",
  secondary:
    "border-2 border-outline bg-white text-text shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/70 hover:bg-gold/10",
  ghost: "text-text transition-colors duration-200 hover:text-coral",
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-bold tracking-[0.01em]",
    variantClasses[variant],
    className,
  );

  if ("href" in props) {
    const linkProps = props as LinkButtonProps;

    return (
      <Link className={buttonClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type, ...buttonProps } = props;

  return (
    <button className={buttonClassName} type={type ?? "button"} {...buttonProps}>
      {children}
    </button>
  );
}
