import { useCallback, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, RotateCcw } from "lucide-react";
import {
  formConnected,
  submitIdea,
  SubmitError,
  validateIdea,
  type IdeaData,
} from "@/features/ideas/submitIdea";

type FormStatus = "idle" | "sending" | "success" | "error";
type Fields = Pick<IdeaData, "idea" | "name" | "className">;

// crypto.randomUUID esiste solo in contesti sicuri (https o localhost).
function createSubmissionId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4),
    hex.slice(4, 6),
    hex.slice(6, 8),
    hex.slice(8, 10),
    hex.slice(10),
  ]
    .map((part) => part.join(""))
    .join("-");
}

export function IdeaSection() {
  const [idea, setIdea] = useState("");
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const submissionId = useRef<string | null>(null);
  const ideaInput = useRef<HTMLTextAreaElement>(null);
  const inFlight = useRef(false);
  // Dopo l'invio il focus passa alla conferma, così il lettore di schermo la annuncia.
  const focusOnMount = useCallback((element: HTMLElement | null) => {
    element?.focus();
  }, []);

  const renewSubmissionId = () => {
    submissionId.current = createSubmissionId();
  };

  // Toglie l'errore di un campo appena il valore torna valido.
  const updateField = (fields: Fields) => {
    renewSubmissionId();
    setErrors((current) => {
      if (!Object.keys(current).length) return current;
      const next = validateIdea({ ...fields, submissionId: "" });
      return Object.fromEntries(
        Object.entries(current).filter(([field]) => next[field]),
      );
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const form = new FormData(event.currentTarget);
    const data = {
      idea,
      name,
      className,
      website: String(form.get("website") || ""),
      submissionId: (submissionId.current ??= createSubmissionId()),
    };
    const validation = validateIdea(data);
    setErrors(validation);

    if (Object.keys(validation).length) {
      ideaInput.current?.focus();
      return;
    }

    inFlight.current = true;
    setStatus("sending");
    setMessage("");

    try {
      await submitIdea(data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof SubmitError
          ? error.message
          : "Connessione interrotta. Riprova: il testo è ancora qui.",
      );
    } finally {
      inFlight.current = false;
    }
  }

  function resetForm() {
    setIdea("");
    setName("");
    setClassName("");
    setErrors({});
    setStatus("idle");
    renewSubmissionId();
  }

  return (
    <section
      id="idea"
      className="idea-section section-pad"
      aria-labelledby="idea-title"
    >
      <h2 id="idea-title">
        ORA METTI
        <br />
        IN LUCE
        <br />
        <span className="highlight-mark">LA TUA IDEA.</span>
      </h2>
      <p className="section-copy">
        Cosa vorresti aggiungere, cambiare o migliorare nella tua scuola?
      </p>
      {!formConnected && (
        <p className="form-availability">
          <span />
          Anteprima del modulo · raccolta non ancora attiva.
        </p>
      )}

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            className="form-success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            role="status"
          >
            <Check size={32} />
            <h3 ref={focusOnMount} tabIndex={-1}>
              IDEA RICEVUTA.
            </h3>
            <p>
              La tua voce è arrivata. Grazie per aver acceso una nuova
              possibilità.
            </p>
            <button type="button" onClick={resetForm}>
              <RotateCcw size={16} /> Scrivi un’altra idea
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="idea-form"
          >
            <div>
              <div className="field-header">
                <label htmlFor="idea-text">
                  La tua idea <span>*</span>
                </label>
                <span>{idea.length}/2000</span>
              </div>
              <textarea
                id="idea-text"
                ref={ideaInput}
                name="idea"
                value={idea}
                onChange={(event) => {
                  setIdea(event.target.value);
                  updateField({ idea: event.target.value, name, className });
                }}
                disabled={status === "sending"}
                placeholder="Anche una piccola idea può fare luce."
                required
                minLength={10}
                maxLength={2000}
                aria-invalid={Boolean(errors.idea)}
                aria-describedby={errors.idea ? "idea-error" : undefined}
              />
              {errors.idea && (
                <p className="field-error" id="idea-error">
                  {errors.idea}
                </p>
              )}
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="idea-name">
                  Nome <span>(facoltativo)</span>
                </label>
                <input
                  id="idea-name"
                  name="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    updateField({ idea, name: event.target.value, className });
                  }}
                  disabled={status === "sending"}
                  maxLength={80}
                  placeholder="Come ti chiami?"
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label htmlFor="idea-class">
                  Classe <span>(facoltativa)</span>
                </label>
                <input
                  id="idea-class"
                  name="className"
                  value={className}
                  onChange={(event) => {
                    setClassName(event.target.value);
                    updateField({ idea, name, className: event.target.value });
                  }}
                  disabled={status === "sending"}
                  maxLength={20}
                  placeholder="Es. 4A"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Sito web</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <button
              className="submit-button"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "INVIO IN CORSO…" : "INVIA LA TUA IDEA"}
              <ArrowUpRight size={16} />
            </button>
            <div aria-live="polite">
              {status === "error" && (
                <p className="field-error submission-error">{message}</p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
