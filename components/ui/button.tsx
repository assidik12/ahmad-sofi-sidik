"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "md", children, ...props }, ref) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-sky-500/30 hover:shadow-lg",
    outline: "border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white",
    ghost: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
