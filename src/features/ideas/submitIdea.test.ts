import { describe, it, expect, vi, afterEach } from "vitest";
import { validateIdea, submitIdea, SubmitError } from "./submitIdea";
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
  it("hides raw network errors behind an Italian message", async () => {
    vi.stubEnv("VITE_GOOGLE_SCRIPT_URL", "https://example.test/exec");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Failed to fetch")),
    );
    const error = await submitIdea(data).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(SubmitError);
    expect((error as Error).message).toContain("Connessione non riuscita");
    expect((error as Error).message).not.toContain("Failed to fetch");
  });
  it("treats a non-JSON response as unconfirmed", async () => {
    vi.stubEnv("VITE_GOOGLE_SCRIPT_URL", "https://example.test/exec");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new SyntaxError("Unexpected token <");
        },
      }),
    );
    await expect(submitIdea(data)).rejects.toThrow("non confermato");
  });
});
