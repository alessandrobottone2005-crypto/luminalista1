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

export async function submitIdea(data: IdeaData) {
  if (Object.keys(validateIdea(data)).length)
    throw new Error("Controlla i campi del modulo.");
  const endpoint = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  if (!endpoint) {
    throw new Error(
      "La raccolta delle idee non è ancora attiva. Il testo resta qui: riprova quando apriremo le proposte.",
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(timeoutMs),
    redirect: "follow",
  });

  if (!response.ok)
    throw new Error(
      "Invio non confermato. Riprova: la tua idea è ancora nel modulo.",
    );

  const result = (await response.json()) as SubmissionResult;
  if (result.ok !== true || result.submissionId !== data.submissionId) {
    throw new Error(result.error || "Invio non confermato. Riprova tra poco.");
  }

  return result;
}
