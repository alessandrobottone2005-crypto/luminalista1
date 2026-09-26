import { LightReveal } from "@/components/LightReveal";

export function IntroSection() {
  return (
    <section className="intro section-pad">
      <div className="intro-line" />
      <LightReveal>
        <h1>
          LA LUCE
          <br />
          RENDE
          <br />
          VISIBILI
          <br />
          <span className="yellow">LE IDEE.</span>
        </h1>
      </LightReveal>
      <div className="intro-copy">
        <img
          src="/Stella.svg"
          alt=""
          className="small-spark"
          aria-hidden="true"
        />
        <p>
          <strong>Lumina</strong> nasce da un’idea semplice: la luce. Per noi
          ogni studente è una luce diversa, con una voce, un’idea e qualcosa da
          portare alla nostra scuola. Tante luci insieme possono illuminare
          molto più di una sola.
        </p>
        <p>
          Per questo non vogliamo che queste elezioni siano una scelta fatta
          soltanto sulle proposte più belle o accattivanti. Prima delle idee ci
          siamo noi: quattro ragazzi, quattro persone, con caratteri, esperienze
          e punti di vista diversi, ma con la stessa voglia di ascoltare e fare.
        </p>
        <p>
          Vogliamo essere rappresentanti presenti, disponibili e soprattutto
          pronti ad ascoltare tutti. Anche l’idea che può sembrare più piccola,
          strana o superflua merita di essere ascoltata, perché dietro ogni
          proposta c’è uno studente che ha scelto di parlare.
        </p>
        <p>
          <strong>Lumina siamo noi, ma soprattutto siete voi.</strong>
        </p>
      </div>
    </section>
  );
}
