import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

const query = qs.stringify({
  populate: [
    'hero.backgroundImg',
    'popularLocations.items.photo',
    'topLocations.items.photo',
    'statistics.items',
    'featuredLocations',
    'testimonials.items.photo',
    'faq.items',
    'featuredLocations.locations',
  ],
})

export const getHomePageData = async () => {
  try {
    const response = await fetchApi({
      route: `home-pages?${query}`,
    })
    const result =
      response && response.data.length > 0 ? response.data[0].attributes : {}
    return result
  } catch (error) {
    console.error('Error fetching home-pages:', error)

    throw Error('Error fetching home-pages')
  }
}
