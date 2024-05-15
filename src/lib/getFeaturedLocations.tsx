import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

const query = qs.stringify({
  populate: ['featuredLocations.locations'],
})

export const getFeaturedLocations = async () => {
  try {
    const response = await fetchApi({
      route: `home-pages?${query}`,
    })

    const result =
      response && response.data.length > 0 ? response.data[0].attributes : {}
    return result
  } catch (error) {
    console.error('Error fetching featured locations:', error)

    throw Error('Error fetching featured locations')
  }
}
