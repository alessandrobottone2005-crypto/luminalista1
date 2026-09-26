import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { getCountdown } from "@/lib/countdown";

const labels = ["GIORNI", "ORE", "MIN", "SEC"] as const;

export function CountdownSection() {
  const [now, setNow] = useState(Date.now());
  const time = getCountdown(siteConfig.electionDate, now);
  // Il timer serve solo finché la data è valida e non ancora passata.
  const running = Boolean(time && time.some((value) => value > 0));
  const ended = Boolean(time) && !running;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, [running]);

  const accessibleLabel = time
    ? `${time[0]} giorni, ${time[1]} ore e ${time[2]} minuti alle elezioni`
    : "Data da annunciare";

  const formattedDate = new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  })
    .format(new Date(siteConfig.electionDate))
    .toUpperCase();

  return (
    <section
      id="elezioni"
      className="countdown section-pad"
      aria-labelledby="countdown-title"
    >
      <h2 id="countdown-title">
        OGNI VOCE
        <br />
        <span className="yellow">CONTA.</span>
      </h2>
      <div className="countdown-grid" role="group" aria-label={accessibleLabel}>
        {labels.map((label, index) => (
          <div key={label}>
            <span className="count-number" aria-hidden="true">
              {time ? String(time[index]).padStart(2, "0") : "--"}
            </span>
            <span className="count-label" aria-hidden="true">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="election-date">
        <span>
          {ended ? "IL CONTO ALLA ROVESCIA È TERMINATO" : formattedDate}
        </span>
        <span>LISTA 01</span>
      </div>
    </section>
  );
}
