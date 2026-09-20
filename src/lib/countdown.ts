export type CountdownValue = readonly [
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
];

export function getCountdown(
  target: string,
  now: number,
): CountdownValue | null {
  const targetMs = Date.parse(target);
  if (!Number.isFinite(targetMs)) return null;

  const totalSeconds = Math.max(0, Math.floor((targetMs - now) / 1000));
  return [
    Math.floor(totalSeconds / 86_400),
    Math.floor(totalSeconds / 3_600) % 24,
    Math.floor(totalSeconds / 60) % 60,
    totalSeconds % 60,
  ];
}
