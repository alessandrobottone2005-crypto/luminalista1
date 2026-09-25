import { ArrowUpRight } from "lucide-react";
import { LightReveal } from "@/components/motion/LightReveal";
import { programPoints } from "@/content/site";

export function ProgramSection() {
  return (
    <section
      id="programma"
      className="program section-pad"
      aria-labelledby="program-title"
    >
      <LightReveal>
        <h2 id="program-title">
          METTIAMO
          <br />A FUOCO
          <br />
          <span className="yellow">LE IDEE.</span>
        </h2>
      </LightReveal>
      <p className="section-copy">
        Le proposte da cui partire.
        <br />
        Tanto spazio per costruire insieme.
      </p>
      <ol className="program-list">
        {programPoints.map((point) => (
          <li className="program-item" key={point.id}>
            <div className="program-row">
              <span className="program-index">{point.id}</span>
              <div className="program-info">
                <span className="program-heading">{point.title}</span>
                <div className="program-text">
                  {point.text.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <a className="text-link" href="#idea">
        E LA TUA IDEA? METTILA IN LUCE <ArrowUpRight size={19} />
      </a>
    </section>
  );
}
