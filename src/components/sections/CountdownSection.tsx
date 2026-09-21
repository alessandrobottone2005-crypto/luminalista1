import { useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getCountdown } from "@/lib/countdown";

const labels = ["GIORNI", "ORE", "MIN", "SEC"] as const;

export function CountdownSection() {
  const [now, setNow] = useState(Date.now());
  const time = getCountdown(siteConfig.electionDate, now);
  const ended = time?.every((value) => value === 0);

  useEffect(() => {
    if (ended || !time) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, [ended, time]);

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
      className="countdown section-pad"
      aria-labelledby="countdown-title"
    >
      <div className="section-top">
        <span>IL FUTURO HA UN APPUNTAMENTO</span>
        <ArrowDownRight size={21} />
      </div>
      <h2 id="countdown-title">
        OGNI VOCE
        <br />
        CONTA.
      </h2>
      <div className="countdown-grid" aria-label={accessibleLabel}>
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
      {siteConfig.electionDateIsProvisional ? (
        <p className="demo-note">
          Data dimostrativa. Le elezioni ufficiali saranno annunciate qui.
        </p>
      ) : null}
    </section>
  );
}
