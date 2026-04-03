import localeId from './locales/id.json'
import localeEn from './locales/en.json'

export const getLocaleText = (key: keyof typeof localeEn) => {
  return {
    id: localeId[key],
    en: localeEn[key],
  }
}

export const getLocaleTextByLanguage = (key: keyof typeof localeEn, language: string) => {
  return {
    id: localeId[key],
    en: localeEn[key],
  }[language]
}
