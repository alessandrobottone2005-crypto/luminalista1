export function ManifestoSection() {
  return (
    <section className="manifesto section-pad" aria-label="Il nostro manifesto">
      <div className="manifesto-star" aria-hidden="true" />
      <h2>
        {["OGNI", "IDEA", "MERITA", "DI ESSERE"].map((line) => (
          <span className="manifesto-line" key={line}>
            {line}
          </span>
        ))}
        <span className="manifesto-line manifesto-outline">VISTA.</span>
      </h2>
      <p>LA NOSTRA DIREZIONE È INSIEME.</p>
    </section>
  );
}
