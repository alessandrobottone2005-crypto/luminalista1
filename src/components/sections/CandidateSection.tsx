import { LightReveal } from "@/components/LightReveal";
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
            <div className="candidate-card">
              <div className="candidate-photo">
                <img
                  src={candidate.image}
                  alt={`Ritratto di ${candidate.name} ${candidate.surname}`}
                  loading="lazy"
                  width="900"
                  height="900"
                  sizes="(min-width: 900px) 300px, 86vw"
                  style={{ objectPosition: candidate.position }}
                />
              </div>
              <div className="candidate-footer">
                <span className="candidate-name">
                  {candidate.name} {candidate.surname}
                </span>
                <span className="candidate-code">{candidate.className}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
