import { LightReveal } from "@/components/motion/LightReveal";
import { candidates } from "@/content/site";

export function CandidateSection() {
  return (
    <section
      id="candidati"
      className="candidates section-pad"
      aria-labelledby="candidates-title"
    >
      <div className="section-top">
        <span>LE PERSONE, PRIMA DI TUTTO</span>
        <span>03 VOLTI</span>
      </div>
      <LightReveal>
        <h2 id="candidates-title">
          CI METTIAMO
          <br />
          <span className="yellow">LA FACCIA.</span>
        </h2>
      </LightReveal>
      <p className="section-copy">
        Stessi corridoi. Stesse sfide.
        <br />
        Una nuova voglia di esserci.
      </p>
      <p className="demo-note">Citazioni da definire.</p>
      <div className="candidate-list">
        {candidates.map((candidate, index) => (
          <article
            className={`candidate candidate-${index}`}
            key={candidate.id}
          >
            <div className="portrait-composition">
              <span className="candidate-number" aria-hidden="true">
                {candidate.id}
              </span>
              <div className="portrait">
                <img
                  src={candidate.image}
                  alt={`Ritratto di ${candidate.name} ${candidate.surname}`}
                  loading="lazy"
                  width="900"
                  height="900"
                  sizes="(min-width: 900px) 330px, 86vw"
                  style={{ objectPosition: candidate.position }}
                />
                <span className="portrait-meta" aria-hidden="true">
                  <span>CANDIDATO</span>
                  <span>LISTA 01</span>
                </span>
                <h3 className="candidate-name">
                  <span>{candidate.name}</span>
                  <span>{candidate.surname}</span>
                </h3>
              </div>
            </div>
            <div className="candidate-info">
              <span className="class-label">
                CLASSE
                <br />
                <b>{candidate.className}</b>
              </span>
              {candidate.quote === "Citazione da definire." ? (
                <span className="candidate-quote-pending">
                  LE SUE PAROLE
                  <br />
                  ARRIVANO PRESTO.
                </span>
              ) : (
                <blockquote>“{candidate.quote}”</blockquote>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
