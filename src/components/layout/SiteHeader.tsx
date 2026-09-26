import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Plus, X } from "lucide-react";
import { BrandAsset } from "@/components/brand/BrandAsset";
import { navigation } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("inizio");
    if (!hero) {
      setOverHero(false);
      return;
    }
    const header = document.querySelector<HTMLElement>(".site-header");
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: `-${header?.offsetHeight ?? 0}px 0px 0px 0px` },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="site-header"
      data-over-hero={overHero && !open ? "true" : undefined}
    >
      <a
        href="#inizio"
        className="header-brand"
        aria-label="Lumina, torna all’inizio"
      >
        <BrandAsset variant="mark" alt="" />
        <span>
          LUMINA<span>LISTA 01</span>
        </span>
      </a>
      <div className="header-actions">
        <a href="#programma">
          IL PROGRAMMA <ArrowDown size={13} />
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={23} /> : <Plus size={23} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="main-nav"
            className="menu-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.28, ease: [0.2, 0, 0, 1] },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.18, ease: [0.2, 0, 0, 1] },
            }}
            onKeyDown={(event) => {
              if (event.key !== "Escape") return;
              setOpen(false);
              document
                .querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }}
            aria-label="Navigazione principale"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={22} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
