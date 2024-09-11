import { I18nManager } from 'react-native'

import i18n from 'i18n-js'

import type { KeyTranslation } from './types'
import type { TranslateOptions } from 'i18n-js'

export const DEFAULT_LANGUAGE = 'en'

export const translations = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  en: () => require('./en/index.js').en,
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ptBr: () => require('./pt_BR/index.js').ptBr,
}

export const t = (key: KeyTranslation, config?: TranslateOptions) =>
  i18n.t(key, config)

export type LanguageAvailable = keyof typeof translations

export const setI18nConfig = (language: LanguageAvailable) => {
  I18nManager.forceRTL(false)

  i18n.translations = { [language]: translations[language]() }
  i18n.locale = language
  i18n.defaultLocale = language
}
