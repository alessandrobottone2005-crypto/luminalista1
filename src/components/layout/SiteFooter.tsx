import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="footer section-pad">
      <div className="footer-top">
        <a href="#inizio" className="footer-brand">
          LUMINA<span>LISTA 01</span>
        </a>
        <a href="#inizio" className="back-top" aria-label="Torna all’inizio">
          <ArrowUp size={21} />
        </a>
      </div>
      <p>
        Liceo Gentileschi
        <br />
        Napoli, Italia
      </p>
      <div className="footer-links">
        <Link to="/privacy">
          PRIVACY <ArrowUpRight size={12} />
        </Link>
      </div>
      <div className="footer-number" aria-hidden="true">
        01
      </div>
      <div className="footer-bottom">
        <span>© 2026 LUMINA</span>
      </div>
    </footer>
  );
}
