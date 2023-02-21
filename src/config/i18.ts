import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
console.log(window);

const resources = {
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
    },
    common: {
      "Welcome to React": "ca cest namespace a part du common",
    },
  },
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: "fr",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
