import { describe, expect, it } from "vitest";
import { clampOffset } from "./useStickerDrag";

const section = { left: 0, top: 100, width: 1000, height: 800 };
// Centro dello sticker a (300, 300) dentro la sezione.
const sticker = { left: 200, top: 300, width: 200, height: 200 };

describe("clampOffset", () => {
  it("lascia invariato uno spostamento dentro la sezione", () => {
    expect(clampOffset({ x: 120, y: -80 }, sticker, section)).toEqual({
      x: 120,
      y: -80,
    });
  });

  it("ferma il centro sul bordo sinistro e su quello alto", () => {
    expect(clampOffset({ x: -900, y: -900 }, sticker, section)).toEqual({
      x: -300,
      y: -300,
    });
  });

  it("ferma il centro sul bordo destro e su quello basso", () => {
    expect(clampOffset({ x: 2000, y: 2000 }, sticker, section)).toEqual({
      x: 700,
      y: 500,
    });
  });

  it("vale anche per sticker più grandi di metà sezione", () => {
    const large = { left: 0, top: 100, width: 800, height: 700 };
    expect(clampOffset({ x: 900, y: -500 }, large, section)).toEqual({
      x: 600,
      y: -350,
    });
  });
});
