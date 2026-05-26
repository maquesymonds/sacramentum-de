"use client";

/* ─────────────────────────────────────────────────────────────────────────────
   Button — reusable CTA component
   Variants: primary | ghost | outline
   ─────────────────────────────────────────────────────────────────────────── */

import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  "primary" | "ghost" | "outline";
  size?:     "sm" | "md" | "lg";
  children:  ReactNode;
  iconRight?: ReactNode;
}

export default function Button({
  variant   = "primary",
  size      = "md",
  children,
  iconRight,
  className,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center gap-2 font-medium tracking-[0.04em] uppercase transition-all duration-300 ease-premium cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue";

  const sizes = {
    sm: "px-5 py-2.5 text-[0.7rem]",
    md: "px-8 py-3.5 text-small",
    lg: "px-10 py-4  text-small",
  };

  const variants = {
    primary: "bg-brand-warm text-brand-dark border border-brand-warm hover:bg-transparent hover:text-brand-warm",
    ghost:   "bg-transparent text-white border border-white/40 hover:bg-white/8 hover:border-white/80",
    outline: "bg-transparent text-brand-dark border border-brand-dark/30 hover:border-brand-dark hover:bg-brand-dark hover:text-surface",
  };

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
      {iconRight}
    </button>
  );
}
