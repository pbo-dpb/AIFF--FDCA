import stringsEn from './strings.en.json?raw'
import stringsFr from './strings.fr.json?raw'

const language = document.documentElement.lang;

const strings = {
    en: stringsEn,
    fr: stringsFr
}

export default JSON.parse(strings[language])