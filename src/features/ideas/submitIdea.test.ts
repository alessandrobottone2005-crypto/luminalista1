import { describe, it, expect, vi, afterEach } from "vitest";
import { validateIdea, submitIdea } from "./submitIdea";
import { getCountdown } from "@/lib/countdown";
const data = {
  idea: "Una biblioteca aperta anche il pomeriggio.",
  name: "",
  className: "",
  submissionId: "12345678-1234-4234-9234-123456789012",
};
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("idea submission", () => {
  it("allows anonymous suggestions and rejects whitespace or oversized text", () => {
    expect(validateIdea(data)).toEqual({});
    expect(validateIdea({ ...data, idea: "          " })).toHaveProperty(
      "idea",
    );
    expect(validateIdea({ ...data, idea: "x".repeat(2001) })).toHaveProperty(
      "idea",
    );
  });
  it("does not report success without a connected provider", async () => {
    vi.stubEnv("VITE_GOOGLE_SCRIPT_URL", "");
    await expect(submitIdea(data)).rejects.toThrow("non è ancora attiva");
  });
  it("requires a matching persistence acknowledgement", async () => {
    vi.stubEnv("VITE_GOOGLE_SCRIPT_URL", "https://example.test/exec");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, submissionId: "different" }),
      }),
    );
    await expect(submitIdea(data)).rejects.toThrow("non confermato");
  });
  it("accepts a confirmed submission", async () => {
    vi.stubEnv("VITE_GOOGLE_SCRIPT_URL", "https://example.test/exec");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, submissionId: data.submissionId }),
      }),
    );
    await expect(submitIdea(data)).resolves.toHaveProperty("ok", true);
  });
  it("preserves provider errors", async () => {
    vi.stubEnv("VITE_GOOGLE_SCRIPT_URL", "https://example.test/exec");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(submitIdea(data)).rejects.toThrow("non confermato");
  });
});
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
