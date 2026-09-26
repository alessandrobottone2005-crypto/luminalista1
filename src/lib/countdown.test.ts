import { describe, it, expect } from "vitest";
import { getCountdown } from "./countdown";
describe("countdown", () => {
  it("handles Rome offset and never goes negative", () => {
    const date = "2026-10-05T08:00:00+01:00";
    expect(getCountdown(date, Date.parse("2026-10-04T07:00:00Z"))).toEqual([
      1, 0, 0, 0,
    ]);
    expect(getCountdown(date, Date.parse("2026-10-06T07:00:00Z"))).toEqual([
      0, 0, 0, 0,
    ]);
  });
  it("handles an unset election date", () =>
    expect(getCountdown("", Date.now())).toBeNull());
});
