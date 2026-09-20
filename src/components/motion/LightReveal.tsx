import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
export function LightReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("light-reveal", className)}>{children}</div>;
}
