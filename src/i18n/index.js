import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import it from "./it.json";
import en from "./en.json";

i18n
    .use(LanguageDetector) // rileva lingua da browser
    .use(initReactI18next)
    .init({
        fallbackLng: "it", // lingua default
        supportedLngs: ["it", "en"],
        resources: {
            it: { translation: it },
            en: { translation: en },
        },
        detection: {
            order: ["navigator", "htmlTag"],
            caches: [], // non salviamo in localStorage per ora
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;