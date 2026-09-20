import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="site-shell privacy-page section-pad">
      <h1>
        QUI LA LUCE
        <br />
        NON È ARRIVATA.
      </h1>
      <p>Questa pagina non esiste.</p>
      <Link className="text-link" to="/">
        TORNA A LUMINA <ArrowUpRight size={20} />
      </Link>
    </div>
  );
}
