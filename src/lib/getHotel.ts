import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'
import { IStrapiItem } from '@/types/strapi'

export const getHotel = async ({ slug }: { slug: string }) => {
  try {
    const query = qs.stringify(
      {
        populate: ['photos', 'location.hotels.photos'],
        locale: process.env.TENANT_LOCALE,
        filters: {
          slug,
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    const data = await fetchApi({
      route: `hotels?${query}`,
    })
    const result = data ? data.data : []

    return result as IStrapiItem<any>[]
  } catch (error) {
    console.error('Error fetching hotels:', error)

    throw Error('Error fetching hotels')
  }
}
