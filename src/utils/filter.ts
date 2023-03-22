import { level, subject } from "@utils/options";

export const questionTypeObject = {
  "Avec Réponse": false,
  "Sans Réponse": false,
};

export const dateOrderObject = {
  "Plus récent": false,
  "Plus ancien": false,
};

export const subjectsObject: Record<subject, boolean> = {
  Mathématique: false,
  Sciences: false,
  Physique: false,
  Informatique: false,
  Technique: false,
  Français: false,
  Anglais: false,
  Arabe: false,
  Italien: false,
  Espagnol: false,
  Allemand: false,
  Histoire: false,
  Géographie: false,
  "Economie et gestion": false,
  Philosophie: false,
  Islamique: false,
};

export const levelsObject: Record<level, boolean> = {
  "1ére année secondaire": false,
  "2éme année sciences": false,
  "2éme année lettres": false,
  "2éme année économie": false,
  "2éme année informatique": false,
  "3éme année sciences": false,
  "3éme année lettres": false,
  "3éme année économie": false,
  "3éme année informatique": false,
  "3éme année mathématique": false,
  "3éme année techniques": false,
  "4éme année sciences": false,
  "4éme année lettres": false,
  "4éme année économie": false,
  "4éme année informatique": false,
  "4éme année mathématique": false,
  "4éme année techniques": false,
};

export const synonyms: any = {
  answered: "Avec Réponse",
  unanswered: "Sans Réponse",
  asc: "Plus ancien",
  desc: "Plus récent",
};

export const reverseSynonyms: any = {
  "Avec Réponse": "answered",
  "Sans Réponse": "unanswered",
  "Plus ancien": "asc",
  "Plus récent": "desc",
};
