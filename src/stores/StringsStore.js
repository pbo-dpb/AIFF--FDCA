// stores/useStringsStore.js
import { defineStore } from "pinia";
import stringsEn from "../assets/strings.en.json?raw";
import stringsFr from "../assets/strings.fr.json?raw";

export const useStringsStore = defineStore("strings", {
  state: () => ({
    currentLanguage: document.documentElement.lang || "en",
    availableLanguages: {
      en: JSON.parse(stringsEn),
      fr: JSON.parse(stringsFr),
    },
  }),

  getters: {
    // Get all strings for current language
    strings: (state) => state.availableLanguages[state.currentLanguage],

    // Get current language
    language: (state) => state.currentLanguage,

    // Check if a language is available
    isLanguageSupported: (state) => (lang) =>
      Object.keys(state.availableLanguages).includes(lang),
  },

  actions: {
    // Change language
    setLanguage(lang) {
      if (this.isLanguageSupported(lang)) {
        this.currentLanguage = lang;
        document.documentElement.lang = lang;
      } else {
        console.warn(`Language ${lang} is not supported`);
      }
    },

    // Initialize store with browser/document language
    initializeLanguage() {
      const docLang = document.documentElement.lang;
      const browserLang = navigator.language?.split("-")[0];

      if (this.isLanguageSupported(docLang)) {
        this.currentLanguage = docLang;
      } else if (this.isLanguageSupported(browserLang)) {
        this.setLanguage(browserLang);
      } else {
        this.setLanguage("en"); // fallback to English
      }
    },
  },
});
