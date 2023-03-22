import React, { useEffect, useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";
import FilterAccordian from "@atoms/FilterAccordian";
import CheckOptions from "@atoms/CheckOptions";
import { level, subject } from "@utils/options";

const questionType = {
  "Avec Réponse": false,
  "Sans Réponse": false,
};

const dateOrder = {
  "Plus ancien": false,
  "Plus récent": false,
};

const subjects: Record<subject, boolean> = {
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

const levels: Record<level, boolean> = {
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

const synonyms: any = {
  answered: "Avec Réponse",
  unanswered: "Sans Réponse",
  asc: "Plus ancien",
  desc: "Plus récent",
};

const reverseSynonyms: any = {
  "Avec Réponse": "answered",
  "Sans Réponse": "unanswered",
  "Plus ancien": "asc",
  "Plus récent": "desc",
};

// =================================================
// ================= 2 WAYS BINDING ================
// =================================================

const generateObjectFromArrayOfStrings = (array: string[], value?: boolean) => {
  const object: Record<string, boolean> = {};
  array.forEach((key) => {
    object[key] = !!value;
  });
  return object;
};

// =========================VS====================

export const generateArrayOfStringsFromObject = (object: Record<string, boolean>) => {
  const array = [];
  for (const key in object) if (object[key]) array.push(reverseSynonyms[key] || key);
  return array;
};

// =================================================
// =================== END =========================
// =================================================

const getOptions = (value: string | string[], object: Record<string, boolean>): any => {
  if (!value) return object;
  value = synonyms[value as string] || value;
  if (Array.isArray(value)) {
    const newObject = generateObjectFromArrayOfStrings(value, true);
    return { ...object, ...newObject };
  } else {
    return { ...object, [value]: true };
  }
};

// const getOnlyTrueAttributes = (obj: any) => {
//   const newObj: any = {};
//   for (const key in obj) {
//     if (obj[key]) {
//       newObj[key] = obj[key];
//     }
//   }
//   return newObj;
// };

// array or single property
// type=answered&order=desc&subjects=maths,francais

const Filter2 = () => {
  const [params, setParams] = useUrlState(
    {
      type: undefined,
      order: undefined,
      subjects: undefined,
      levels: undefined,
      dateOrder: undefined,
      startDate: undefined,
      endDate: undefined,
    },
    {
      parseOptions: {
        arrayFormat: "comma",
      },
      stringifyOptions: {
        arrayFormat: "comma",
      },
    }
  );
  const [type, setType] = useState(questionType);
  useEffect(() => {
    const { type, order, subjects, levels, dateOrder, startDate, endDate } = params;
    setType(getOptions(type, questionType));

    // setType((prev) => ({ ...prev }));
    // console.log(params);
  }, [params]);

  useEffect(() => {
    //   setParams((params) => ({ ...params, type: generateArrayOfStringsFromObject(type) }));
    console.log("type: ", type);
    console.log("params: ", params);
  }, [type]);
  return (
    <div>
      <button onClick={() => setParams(() => ({ type: "answered" }))}>click</button>
      <FilterAccordian title="Type" isExpanded>
        <CheckOptions state={type} setState={setType} setParams={setParams} query={"type"} />
      </FilterAccordian>
    </div>
  );
};

export default Filter2;
