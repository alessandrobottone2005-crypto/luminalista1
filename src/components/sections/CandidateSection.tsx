import { LightReveal } from "@/components/motion/LightReveal";
import { candidates } from "@/content/site";

export function CandidateSection() {
  return (
    <section
      id="candidati"
      className="candidates section-pad"
      aria-labelledby="candidates-title"
    >
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
              {candidate.quote ? (
                <blockquote>“{candidate.quote}”</blockquote>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
