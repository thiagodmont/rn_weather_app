import { I18nManager } from 'react-native'
import i18n from 'i18n-js'

export const DEFAULT_LANGUAGE = 'en'

export const translationGetters = {
  en: () => require('./en/index.json'),
  ptBr: () => require('./pt_BR/index.json'),
}

export const t = (key: string, config?: any | null) => i18n.t(key, config)

export const setI18nConfig = (language = DEFAULT_LANGUAGE) => {
  I18nManager.forceRTL(false)

  i18n.translations = { [language]: translationGetters[language]() }
  i18n.locale = language
}
