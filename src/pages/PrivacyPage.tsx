import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function PrivacyPage() {
  return (
    <div className="site-shell privacy-page section-pad">
      <Link to="/" className="text-link">
        <ArrowLeft size={18} /> TORNA A LUMINA
      </Link>
      <h1>
        LA TUA IDEA.
        <br />I TUOI DATI.
      </h1>
      <p>Informativa provvisoria per la landing Lumina — Lista 1.</p>
      <h2>Raccolta delle idee</h2>
      <p>
        Il modulo registra l’idea, data e ora, un identificativo tecnico
        dell’invio e, solo se forniti, nome e classe nel Foglio Google gestito
        dalla lista.
      </p>
      <h2>Prima della pubblicazione ufficiale</h2>
      <p>
        La versione definitiva dovrà indicare responsabile e contatti, finalità,
        base giuridica, tempi di conservazione e modalità per chiedere accesso o
        cancellazione.
      </p>
      <h2>Sul sito</h2>
      <p>
        Non sono presenti strumenti di analisi o cookie pubblicitari. Font, logo
        e immagini sono distribuiti insieme al sito.
      </p>
      <Link className="text-link" to="/">
        TORNA ALLA LANDING <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
