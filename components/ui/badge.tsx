import { cn } from "@/lib/utils";

type BadgeProps = {
  text: string;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
};

const variantMap: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-700"
};

export function Badge({ text, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variantMap[variant],
        className
      )}
    >
      {text}
    </span>
  );
}
