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
    "bg-accent text-slate-950 shadow-crystal transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent/90",
  secondary:
    "border border-outline/80 bg-surface/80 text-text shadow-soft transition-colors duration-200 hover:border-accent/40 hover:bg-surface-strong/90",
  ghost: "text-text/90 transition-colors duration-200 hover:text-accent",
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-wide",
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
