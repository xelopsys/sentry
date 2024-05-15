import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

const query = qs.stringify({
  populate: ['privacyPolicy'],
})

export const getPrivacyPageData = async () => {
  try {
    const response = await fetchApi({
      route: `privacy-policy-pages?${query}`,
    })

    const result =
      response && response.data.length > 0 ? response.data[0].attributes : {}
    return result
  } catch (error) {
    console.error('Error fetching privacy-policy-pages:', error)

    throw Error('Error fetching privacy-policy-pages')
  }
}
