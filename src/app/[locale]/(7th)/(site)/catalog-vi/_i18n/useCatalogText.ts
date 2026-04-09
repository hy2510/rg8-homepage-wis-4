'use client'

import { useParams } from 'next/navigation'
import {
  CATALOG_LANGUAGES,
  type CatalogLanguage,
  type CatalogSection,
  type CatalogSectionText,
  catalogText,
} from './catalogText'

const DEFAULT_LANGUAGE: CatalogLanguage = 'ko'

function normalizeLanguage(value: string | undefined): CatalogLanguage {
  if (!value) return DEFAULT_LANGUAGE

  const normalized = value.toLowerCase()
  if ((CATALOG_LANGUAGES as readonly string[]).includes(normalized)) {
    return normalized as CatalogLanguage
  }

  return DEFAULT_LANGUAGE
}

export function useCatalogLanguage(): CatalogLanguage {
  const params = useParams<{ locale?: string | string[] }>()
  const rawLocale = Array.isArray(params?.locale)
    ? params.locale[0]
    : params?.locale

  return normalizeLanguage(rawLocale)
}

export function useCatalogSectionText<T extends CatalogSection>(
  section: T,
  fixedLanguage?: CatalogLanguage,
): CatalogSectionText<T> {
  // const languageFromRoute = useCatalogLanguage()
  // const language = fixedLanguage ?? languageFromRoute
  const language = 'vi'
  return catalogText[language][section]
}
