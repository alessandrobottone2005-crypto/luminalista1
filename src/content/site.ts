export const siteConfig = {
  name: "Lumina",
  listNumber: "01",
  school: "Liceo Gentileschi",
  city: "Napoli",
  demo: true,
  electionDate: "2026-10-05T08:00:00+01:00",
  instagram: "",
  tiktok: "",
};

export const navigation = [
  { label: "I candidati", id: "candidati" },
  { label: "Il programma", id: "programma" },
  { label: "Lumina IRL", id: "irl" },
  { label: "La tua idea", id: "idea" },
];

export const candidates = [
  {
    id: "01",
    name: "Valeria",
    surname: "Bottone",
    className: "5CE",
    quote: "",
    image: "/images/candidates/valeria-bottone.webp",
    position: "center 35%",
  },
  {
    id: "02",
    name: "Luca",
    surname: "Pagliarulo",
    className: "5AC",
    quote: "",
    image: "/images/candidates/luca-pagliarulo.webp",
    position: "center 38%",
  },
  {
    id: "03",
    name: "Marco",
    surname: "Mondiello",
    className: "5AC",
    quote: "",
    image: "/images/candidates/marco-mondiello.webp",
    position: "center 30%",
  },
];

export const programPoints = [
  {
    id: "01",
    title: "LA TUA VOCE,\nOGNI GIORNO.",
    category: "ASCOLTO",
    description:
      "Uno spazio aperto alle idee di tutti, anche tra un’assemblea e l’altra.",
    detail:
      "Proponiamo una raccolta continua di suggerimenti e incontri periodici con i rappresentanti di classe. Ogni mese, un aggiornamento sulle idee ricevute e sui passi fatti.",
  },
  {
    id: "02",
    title: "PIÙ SPAZIO\nALLE PASSIONI.",
    category: "CULTURA",
    description:
      "Musica, cinema, arte. Portiamo a scuola quello che ci accende.",
    detail:
      "Laboratori autogestiti, cineforum e una giornata dedicata ai talenti degli studenti, da progettare insieme alla scuola e alle associazioni del territorio.",
  },
  {
    id: "03",
    title: "STARE BENE\nÈ UN DIRITTO.",
    category: "BENESSERE",
    description:
      "Una scuola che ascolta, include e si prende cura delle persone.",
    detail:
      "Vogliamo rendere più visibili i servizi di ascolto e costruire momenti di confronto sul benessere, sul rispetto e sulle relazioni tra studenti.",
  },
  {
    id: "04",
    title: "FACCIAMO\nSQUADRA.",
    category: "COMUNITÀ",
    description:
      "Sport, tornei e occasioni per conoscerci oltre la nostra classe.",
    detail:
      "Un calendario condiviso di tornei e attività, aperto a tutti i livelli. Occasioni semplici per incontrarci e vivere la scuola anche come comunità.",
  },
  {
    id: "05",
    title: "IL CAMBIAMENTO\nPARTE DA QUI.",
    category: "SOSTENIBILITÀ",
    description: "Piccoli gesti concreti per una scuola più responsabile.",
    detail:
      "Una proposta per migliorare la raccolta differenziata, scambiare libri e materiali e organizzare giornate di cura degli spazi, in accordo con l’istituto.",
  },
];
