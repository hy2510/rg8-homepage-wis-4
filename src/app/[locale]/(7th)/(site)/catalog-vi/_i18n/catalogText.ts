import { catalogTextKo } from './catalog.text.ko'
import { catalogTextEn } from './catalog.text.en'
import { catalogTextVi } from './catalog.text.vi'

export const CATALOG_LANGUAGES = ['ko', 'en', 'vi'] as const
export type CatalogLanguage = (typeof CATALOG_LANGUAGES)[number]

type CatalogTextShape = {
  [Section in keyof typeof catalogTextKo]: {
    [Key in keyof (typeof catalogTextKo)[Section]]: string
  }
}

export type CatalogTextSchema = CatalogTextShape

export const catalogText: Record<CatalogLanguage, CatalogTextSchema> = {
  ko: catalogTextKo,
  en: catalogTextEn,
  vi: catalogTextVi,
}

export type CatalogSection = keyof typeof catalogTextKo
export type CatalogSectionText<T extends CatalogSection> = CatalogTextSchema[T]
