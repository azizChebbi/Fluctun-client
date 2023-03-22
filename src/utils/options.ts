export type level =
  | "1ére année secondaire"
  | "2éme année sciences"
  | "2éme année lettres"
  | "2éme année économie"
  | "2éme année informatique"
  | "3éme année sciences"
  | "3éme année lettres"
  | "3éme année économie"
  | "3éme année informatique"
  | "3éme année mathématique"
  | "3éme année techniques"
  | "4éme année sciences"
  | "4éme année lettres"
  | "4éme année économie"
  | "4éme année informatique"
  | "4éme année mathématique"
  | "4éme année techniques";

export type subject =
  | "Mathématique"
  | "Sciences"
  | "Physique"
  | "Informatique"
  | "Technique"
  | "Français"
  | "Anglais"
  | "Arabe"
  | "Italien"
  | "Espagnol"
  | "Allemand"
  | "Histoire"
  | "Géographie"
  | "Economie et gestion"
  | "Philosophie"
  | "Islamique";

// define enum classes that take level as key and table of subjects as value
export type Classes = Record<level, subject[]>; // { [key: level]: subject[] }

export const classes: Classes = {
  "1ére année secondaire": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Technique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
  ],
  "2éme année sciences": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Technique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
  ],
  "2éme année lettres": [
    "Mathématique",
    "Sciences",
    "Anglais",
    "Arabe",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
  ],
  "2éme année économie": [
    "Mathématique",
    "Sciences",
    "Informatique",
    "Anglais",
    "Arabe",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Economie et gestion",
  ],
  "2éme année informatique": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Technique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
  ],
  "3éme année mathématique": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
  "3éme année sciences": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
  "3éme année lettres": [
    "Mathématique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
  "3éme année économie": [
    "Mathématique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
    "Economie et gestion",
  ],
  "3éme année techniques": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
  "3éme année informatique": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
  "4éme année mathématique": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
  "4éme année sciences": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
  "4éme année lettres": [
    "Mathématique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
  "4éme année économie": [
    "Mathématique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
    "Economie et gestion",
  ],
  "4éme année techniques": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
  "4éme année informatique": [
    "Mathématique",
    "Sciences",
    "Physique",
    "Informatique",
    "Arabe",
    "Anglais",
    "Français",
    "Islamique",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Allemand",
    "Espagnol",
    "Italien",
  ],
};

type SubjectOption = {
  label: subject;
  value: subject;
};

type LevelOption = {
  label: level;
  value: level;
};

export const subjectOptions: SubjectOption[] = [
  { value: "Mathématique", label: "Mathématique" },
  { value: "Sciences", label: "Sciences" },
  { value: "Physique", label: "Physique" },
  { value: "Informatique", label: "Informatique" },
  { value: "Technique", label: "Technique" },
  { value: "Arabe", label: "Arabe" },
  { value: "Anglais", label: "Anglais" },
  { value: "Français", label: "Français" },
  { value: "Islamique", label: "Islamique" },
  { value: "Histoire", label: "Histoire" },
  { value: "Géographie", label: "Géographie" },
  { value: "Philosophie", label: "Philosophie" },
  { value: "Allemand", label: "Allemand" },
  { value: "Espagnol", label: "Espagnol" },
  { value: "Italien", label: "Italien" },
  { value: "Economie et gestion", label: "Economie et gestion" },
];

export const levelOptions: LevelOption[] = [
  { label: "1ére année secondaire", value: "1ére année secondaire" },
  { label: "2éme année sciences", value: "2éme année sciences" },
  { label: "2éme année lettres", value: "2éme année lettres" },
  { label: "2éme année économie", value: "2éme année économie" },
  { label: "2éme année informatique", value: "2éme année informatique" },
  { label: "3éme année mathématique", value: "3éme année mathématique" },
  { label: "3éme année sciences", value: "3éme année sciences" },
  { label: "3éme année lettres", value: "3éme année lettres" },
  { label: "3éme année économie", value: "3éme année économie" },
  { label: "3éme année techniques", value: "3éme année techniques" },
  { label: "3éme année informatique", value: "3éme année informatique" },
  { label: "4éme année mathématique", value: "4éme année mathématique" },
  { label: "4éme année sciences", value: "4éme année sciences" },
  { label: "4éme année lettres", value: "4éme année lettres" },
  { label: "4éme année économie", value: "4éme année économie" },
  { label: "4éme année techniques", value: "4éme année techniques" },
  { label: "4éme année informatique", value: "4éme année informatique" },
];

// define function that takes in a level and returns an array of subjects
export const getSubjects = (level: level | undefined): subject[] => {
  if (!level) return [];
  return classes[level];
};

// define function that takes in a subject and returns an array of levels
export const getLevels = (subject: subject | undefined): level[] => {
  if (!subject) return [];
  return Object.keys(classes).filter((level) => classes[level as level].includes(subject)) as level[];
};

export const generateLabelValueOptions = (options: level[] | subject[]) => {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
};
