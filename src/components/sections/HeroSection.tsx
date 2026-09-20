import { Component, lazy, Suspense, useState, type ReactNode } from "react";
import { ArrowDown, Moon, Sun } from "lucide-react";
import { BrandAsset } from "@/components/brand/BrandAsset";

const LuminaScene = lazy(() => import("@/components/three/LuminaScene"));

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <BrandAsset className="scene-fallback" alt="" />
    ) : (
      this.props.children
    );
  }
}

export function HeroSection() {
  const [lit, setLit] = useState(true);

  return (
    <section
      id="inizio"
      className={`hero ${lit ? "" : "dimmed"}`}
      aria-labelledby="hero-title"
    >
      <div className="hero-location hero-enter">
        <span>LICEO GENTILESCHI</span>
        <span>NAPOLI, ITALIA</span>
      </div>
      <div className="hero-art">
        <div className="light-orbit" />
        <div className="hero-beam" />
        <SceneBoundary>
          <Suspense
            fallback={
              <div className="scene-loading">
                <BrandAsset variant="mark" alt="" />
              </div>
            }
          >
            <LuminaScene />
          </Suspense>
        </SceneBoundary>
        <button
          className="light-control"
          onClick={() => setLit((current) => !current)}
          aria-pressed={lit}
          aria-label={
            lit ? "Abbassa la luce del logo" : "Accendi la luce del logo"
          }
        >
          {lit ? <Sun size={15} /> : <Moon size={15} />}
          <span>{lit ? "LA LUCE È NELLE TUE MANI" : "TOCCA. FAI LUCE."}</span>
        </button>
        <span className="hero-art-caption" aria-hidden="true">
          DAL BUIO, UNA POSSIBILITÀ.
        </span>
      </div>
      <div className="hero-wordmark hero-enter">
        <h1 id="hero-title">
          <BrandAsset variant="wordmark" alt="Lumina" />
        </h1>
        <div className="hero-list">
          <span>LA TUA VOCE. LA NOSTRA LUCE.</span>
          <span>
            LISTA <b>01</b>
          </span>
        </div>
      </div>
      <div className="hero-bottom hero-enter">
        <p>
          Il futuro della nostra scuola
          <br />
          inizia da un’idea. <strong>La tua.</strong>
        </p>
        <a className="discover" href="#intro" aria-label="Scopri Lumina">
          <ArrowDown size={22} />
        </a>
      </div>
      <div className="hero-bottomline">
        <span>SCORRI PER ACCENDERE IL CAMBIAMENTO</span>
        <span>↓</span>
      </div>
    </section>
  );
}
