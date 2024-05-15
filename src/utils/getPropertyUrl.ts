import qs from 'qs'

import { getProviderBaseUrl } from '@/utils/getProviderBaseUrl'

interface IGetPropertyUrl {
  id?: number
  location: string
  type: 'hotel' | 'resort' | 'villa' | 'apartment'
}

export const getPropertyUrl = ({ id, location, type }: IGetPropertyUrl) => {
  const query = qs.stringify({
    dest_id: id,
    dest_type: type,
    ss: location,
  })
  return `${getProviderBaseUrl({ providerLanguage: process.env.NEXT_PUBLIC_TENANT_LOCALE || '' })}?${query}`
}
