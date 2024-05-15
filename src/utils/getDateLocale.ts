import { de, enUS, es, fr, nl, pt } from 'date-fns/locale'

export const getDateLocale = () => {
  switch (process.env.NEXT_PUBLIC_TENANT_LOCALE) {
    case 'nl':
      return nl
    case 'de':
      return de
    case 'es':
      return es
    case 'fr':
      return fr
    case 'pt':
      return pt
    default:
      return enUS
  }
}
