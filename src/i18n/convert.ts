import { protectedBankingTerms } from './bankingDictionary'
import type { Locale } from './types'

type OpenCCModule = typeof import('opencc-js')
type Converter = ReturnType<OpenCCModule['Converter']>

let taiwanConverterPromise: Promise<Converter> | null = null

const placeholderPrefix = '__XMBANK_PROTECTED_'
const placeholderSuffix = '__'

const phraseCorrections = Object.freeze([
  ['臺', '台'],
] as const)

function getTaiwanConverter() {
  taiwanConverterPromise ??= import('opencc-js').then((opencc) =>
    opencc.Converter({ from: 'cn', to: 'twp' }),
  )

  return taiwanConverterPromise
}

function protectTerms(text: string) {
  return protectedBankingTerms.reduce((protectedText, term, index) => {
    const placeholder = `${placeholderPrefix}${index}${placeholderSuffix}`
    return protectedText.replaceAll(term, placeholder)
  }, text)
}

function restoreTerms(text: string) {
  return protectedBankingTerms.reduce((restoredText, term, index) => {
    const placeholder = `${placeholderPrefix}${index}${placeholderSuffix}`
    return restoredText.replaceAll(placeholder, term)
  }, text)
}

function applyPhraseCorrections(text: string) {
  return phraseCorrections.reduce(
    (correctedText, [from, to]) => correctedText.replaceAll(from, to),
    text,
  )
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export async function convertText(text: string, locale: Locale): Promise<string> {
  if (locale === 'zh-CN' || text.length === 0) {
    return text
  }

  const converter = await getTaiwanConverter()
  const protectedText = protectTerms(text)
  const converted = converter(protectedText)

  return restoreTerms(applyPhraseCorrections(converted))
}

export async function convertValue<T>(value: T, locale: Locale): Promise<T> {
  if (typeof value === 'string') {
    return convertText(value, locale) as Promise<T>
  }

  if (Array.isArray(value)) {
    const convertedItems = await Promise.all(
      value.map((item) => convertValue(item, locale)),
    )

    return convertedItems as T
  }

  if (isPlainObject(value)) {
    const convertedEntries = await Promise.all(
      Object.entries(value).map(async ([key, entryValue]) => [
        key,
        await convertValue(entryValue, locale),
      ]),
    )

    return Object.fromEntries(convertedEntries) as T
  }

  return value
}
