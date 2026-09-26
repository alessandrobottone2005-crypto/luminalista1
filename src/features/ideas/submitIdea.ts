export type IdeaData = {
  idea: string;
  name: string;
  className: string;
  website?: string;
  submissionId: string;
};

type SubmissionResult = {
  ok: boolean;
  submissionId?: string;
  error?: string;
};

const timeoutMs = 20_000;

export const formConnected = Boolean(import.meta.env.VITE_GOOGLE_SCRIPT_URL);

export function validateIdea(data: IdeaData) {
  const errors: Record<string, string> = {};

  if (data.idea.trim().length < 10)
    errors.idea = "Raccontaci qualcosa in più: scrivi almeno 10 caratteri.";
  if (data.idea.trim().length > 2_000)
    errors.idea = "La tua idea può contenere al massimo 2.000 caratteri.";
  if (data.name.trim().length > 80)
    errors.name = "Usa al massimo 80 caratteri per il nome.";
  if (data.className.trim().length > 20)
    errors.className = "Usa al massimo 20 caratteri per la classe.";

  return errors;
}

/** Errore mostrabile all’utente: il messaggio è già in italiano. */
export class SubmitError extends Error {
  name = "SubmitError";
}

const unconfirmed =
  "Invio non confermato. Riprova: la tua idea è ancora nel modulo.";

export async function submitIdea(data: IdeaData) {
  if (Object.keys(validateIdea(data)).length)
    throw new SubmitError("Controlla i campi del modulo.");
  const endpoint = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  if (!endpoint) {
    throw new SubmitError(
      "La raccolta delle idee non è ancora attiva. Il testo resta qui: riprova quando apriremo le proposte.",
    );
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(timeoutMs),
      redirect: "follow",
    });
  } catch (error) {
    // Rete assente, timeout o CORS: mai il testo grezzo del browser.
    const timedOut =
      error instanceof DOMException && error.name === "TimeoutError";
    throw new SubmitError(
      timedOut
        ? "La connessione è troppo lenta. Riprova: la tua idea è ancora nel modulo."
        : "Connessione non riuscita. Controlla la rete e riprova: la tua idea è ancora nel modulo.",
    );
  }

  if (!response.ok) throw new SubmitError(unconfirmed);

  let result: SubmissionResult;
  try {
    result = (await response.json()) as SubmissionResult;
  } catch {
    throw new SubmitError(unconfirmed);
  }
  if (result?.ok !== true || result.submissionId !== data.submissionId) {
    // Gli errori del ricevitore Apps Script sono già scritti in italiano.
    throw new SubmitError(
      typeof result?.error === "string" && result.error
        ? result.error
        : "Invio non confermato. Riprova tra poco.",
    );
  }

  return result;
}
