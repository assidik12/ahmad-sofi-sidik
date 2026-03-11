import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    outline: "border border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400",
    secondary: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };

  return <span ref={ref} className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />;
});

Badge.displayName = "Badge";
export { Badge };
