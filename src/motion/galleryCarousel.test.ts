import { describe, expect, it } from "vitest";
import {
  nearestPhoto,
  photoWindow,
  releasePhoto,
  wrapPhoto,
} from "./galleryCarousel";

describe("cascade carousel navigation", () => {
  it("wraps in both directions including negative positions", () => {
    expect(wrapPhoto(-1, 72)).toBe(71);
    expect(wrapPhoto(72, 72)).toBe(0);
    expect(wrapPhoto(-145, 72)).toBe(71);
    expect(wrapPhoto(4, 0)).toBe(0);
  });
  it("chooses the shortest route to a photo across the seam", () => {
    expect(nearestPhoto(71, 0, 72)).toBe(-1);
    expect(nearestPhoto(0, 71, 72)).toBe(72);
    expect(nearestPhoto(5, 72, 72)).toBe(77);
  });
  it("caps flick momentum to three photos and settles slow drags", () => {
    expect(releasePhoto(1.4, 100)).toBe(4);
    expect(releasePhoto(1.4, -100)).toBe(-2);
    expect(releasePhoto(1.4, 0)).toBe(1);
    expect(releasePhoto(1.7, 0)).toBe(2);
  });
  it("keeps seven mounted photos, with no duplicates in small collections", () => {
    expect(photoWindow(72, 72)).toEqual([69, 70, 71, 72, 73, 74, 75]);
    for (const count of [0, 1, 2, 3, 7, 72]) {
      const window = photoWindow(-1, count);
      expect(window.length).toBe(Math.min(count, 7));
      expect(
        new Set(window.map((position) => wrapPhoto(position, count))).size,
      ).toBe(window.length);
    }
  });
});
