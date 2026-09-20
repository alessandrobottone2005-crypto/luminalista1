import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, it, expect, vi } from "vitest";
const source = readFileSync("google-apps-script/Code.gs", "utf8");
function receiver(duplicate = false) {
  const write = vi.fn();
  const release = vi.fn();
  const format = {
    setNumberFormat: vi.fn(),
    setWrap: vi.fn(),
    setValues: write,
    createTextFinder: () => ({
      matchEntireCell: () => ({ findNext: () => (duplicate ? {} : null) }),
    }),
  };
  const api = runInNewContext(source + "; ({doPost,cellText});", {
    ContentService: {
      createTextOutput: (s: string) => ({ setMimeType: () => JSON.parse(s) }),
      MimeType: { JSON: "json" },
    },
    HtmlService: { createHtmlOutput: (s: string) => s },
    Utilities: { getUuid: () => crypto.randomUUID() },
    SpreadsheetApp: {
      openById: () => ({
        getSheetByName: () => ({
          getLastRow: () => (duplicate ? 2 : 1),
          getRange: () => format,
        }),
      }),
      flush: vi.fn(),
    },
    LockService: {
      getScriptLock: () => ({
        tryLock: () => true,
        hasLock: () => true,
        releaseLock: release,
      }),
    },
    CacheService: { getScriptCache: () => ({ get: () => null, put: vi.fn() }) },
    console,
  });
  return { api, write, release };
}
const data = {
  idea: "Vorrei più libri disponibili per tutti.",
  name: "=1+1",
  className: "5A",
  submissionId: "12345678-1234-4234-9234-123456789012",
};
describe("Apps Script receiver", () => {
  it("persists one validated row and escapes formula injection", () => {
    const { api, write, release } = receiver();
    expect(
      api.doPost({ postData: { contents: JSON.stringify(data) } }),
    ).toEqual({ ok: true, submissionId: data.submissionId });
    expect(write.mock.calls[0][0][0][2]).toBe("'=1+1");
    expect(release).toHaveBeenCalledOnce();
  });
  it("acknowledges a retry without duplicating a row", () => {
    const { api, write } = receiver(true);
    expect(
      api.doPost({ postData: { contents: JSON.stringify(data) } }).ok,
    ).toBe(true);
    expect(write).not.toHaveBeenCalled();
  });
  it("rejects spam and malformed payloads without writing", () => {
    const { api, write } = receiver();
    expect(api.doPost({ postData: { contents: "bad json" } }).ok).toBe(false);
    expect(
      api.doPost({
        postData: { contents: JSON.stringify({ ...data, website: "spam" }) },
      }).ok,
    ).toBe(false);
    expect(write).not.toHaveBeenCalled();
  });
  it("accepts a native HTML form and returns a readable confirmation", () => {
    const { api, write } = receiver();
    const result = api.doPost({
      parameter: { ...data, nativeForm: "1" },
      postData: { contents: "idea=example" },
    });
    expect(result).toContain("IDEA RICEVUTA");
    expect(write).toHaveBeenCalledOnce();
  });
});
