import { ArrowUpRight, Plus } from "lucide-react";
import { LightReveal } from "@/components/motion/LightReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
        Cinque punti da cui partire.
        <br />
        Tanto spazio per costruire insieme.
      </p>
      <Accordion type="single" collapsible className="program-list">
        {programPoints.map((point) => (
          <AccordionItem
            className="program-item"
            value={point.id}
            key={point.id}
          >
            <AccordionTrigger className="program-trigger">
              <span className="program-index">{point.id}</span>
              <span className="program-info">
                <span className="program-category">{point.category}</span>
                <span className="program-heading">{point.title}</span>
                <span className="program-description">{point.description}</span>
                <span className="program-read">
                  SCOPRI LA PROPOSTA <Plus size={16} />
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="program-detail">
              {point.detail}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <a className="text-link" href="#idea">
        E LA TUA IDEA? METTILA IN LUCE <ArrowUpRight size={19} />
      </a>
    </section>
  );
}
