"use client";

import { getTypeColor } from "@/lib/type-colors";
import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: string;
  size?: "sm" | "md";
  className?: string;
}

export function TypeBadge({ type, size = "sm", className }: TypeBadgeProps) {
  const colors = getTypeColor(type);

  return (
    <span
      className={cn(
        "type-badge",
        colors.bg,
        colors.text,
        size === "md" && "px-3 py-1 text-xs",
        className
      )}
    >
      {type}
    </span>
  );
}
