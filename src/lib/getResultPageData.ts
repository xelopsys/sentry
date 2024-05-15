import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

const query = qs.stringify({
  populate: [
    'locationPageHero.backgroundImg',
    'searchBar',
    'locationPageTemplates',
    'locationPageFaq.items',
    'locationPageTemplates',
  ],
})

export const getResultPageData = async () => {
  try {
    const response = await fetchApi({
      route: `website-commons?${query}`,
    })

    const result =
      response && response.data.length > 0 ? response.data[0].attributes : {}
    return result
  } catch (error) {
    console.error('Error fetching result page:', error)

    throw Error('Error fetching result page')
  }
}
