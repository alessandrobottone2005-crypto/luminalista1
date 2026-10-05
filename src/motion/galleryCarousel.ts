export const CASCADE_SPACING = 0.78;

/** Posizioni continue per attraversare le estremità senza invertire direzione. */
export const wrapPhoto = (position: number, count: number) =>
  count > 0 ? ((Math.round(position) % count) + count) % count : 0;

export function nearestPhoto(index: number, position: number, count: number) {
  if (!count) return 0;
  const current = Math.round(position);
  let distance = index - wrapPhoto(current, count);
  distance -= count * Math.round(distance / count);
  return current + distance;
}

export function releasePhoto(position: number, velocity: number) {
  const nearest = Math.round(position);
  return Math.max(
    nearest - 3,
    Math.min(nearest + 3, Math.round(position + velocity * 0.2)),
  );
}

export function photoWindow(position: number, count: number) {
  const size = Math.min(7, count);
  const start = Math.round(position) - Math.floor(size / 2);
  return Array.from({ length: size }, (_, offset) => start + offset);
}
