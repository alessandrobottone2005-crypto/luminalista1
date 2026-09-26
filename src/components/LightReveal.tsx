import type { ReactNode } from "react";

export function LightReveal({ children }: { children: ReactNode }) {
  return <div className="light-reveal">{children}</div>;
}
