import math from "@icons/subjects/math.svg";
import sciences from "@icons/subjects/sciences.svg";
import physics from "@icons/subjects/physics.svg";
import informatics from "@icons/subjects/informatics.svg";
import technics from "@icons/subjects/technics.svg";
import arabic from "@icons/subjects/arabic.svg";
import english from "@icons/subjects/english.svg";
import frensh from "@icons/subjects/frensh.svg";
import islamic from "@icons/subjects/islamic.svg";
import history from "@icons/subjects/history.svg";
import geography from "@icons/subjects/geography.svg";
import economy from "@icons/subjects/economy.svg";
import german from "@icons/subjects/german.svg";
import philosophy from "@icons/subjects/philosophy.svg";
import spanish from "@icons/subjects/spanish.svg";
import italian from "@icons/subjects/italian.svg";
import { subject } from "./options";

type Icons = Record<subject, string>;

export const icons: Icons = {
  Mathématique: math,
  Sciences: sciences,
  Physique: physics,
  Informatique: informatics,
  Technique: technics,
  Français: frensh,
  Anglais: english,
  Arabe: arabic,
  Islamique: islamic,
  Histoire: history,
  Géographie: geography,
  "Economie et gestion": economy,
  Allemand: german,
  Espagnol: spanish,
  Italien: italian,
  Philosophie: philosophy,
};
