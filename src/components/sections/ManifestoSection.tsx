export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="manifesto section-pad"
      aria-label="Il nostro manifesto"
    >
      <div className="manifesto-stage">
        <img
          src="/Stella.svg"
          alt=""
          className="manifesto-star"
          aria-hidden="true"
        />
        <h2>
          {["OGNI", "IDEA", "MERITA", "DI ESSERE"].map((line) => (
            <span className="manifesto-line" key={line}>
              {line}
            </span>
          ))}
          <span className="manifesto-line manifesto-outline">VISTA.</span>
        </h2>
      </div>
    </section>
  );
}
