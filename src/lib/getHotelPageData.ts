import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

const query = qs.stringify({
  populate: [
    'hotelTranslations.bookingWidget',
    'locationFaq.items',
    'searchBar',
    'hotelFaqTemplate',
    'hotelPageTemplates',
  ],
  locale: process.env.TENANT_LOCALE,
})

export const getHotelPageData = async () => {
  try {
    const response = await fetchApi({
      route: `website-commons?${query}`,
    })

    const result =
      response && response.data.length > 0 ? response.data[0].attributes : {}
    return result
  } catch (error) {
    console.error('Error fetching website-commons hotel page:', error)

    throw Error('Error fetching website-commons hotel page')
  }
}
