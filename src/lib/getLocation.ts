import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

export const getLocation = async ({
  slug,
  populateHotels,
}: {
  slug: string
  populateHotels?: string[]
}) => {
  try {
    const query = qs.stringify(
      {
        populate: {
          coverImage: true,
          hotels: {
            populate: populateHotels,
          },
        },
        filters: {
          slug: {
            $is: slug,
          },
        },
        pagination: {
          hotels: {
            page: 1,
            pageSize: 10,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    const data = await fetchApi({
      route: `locations?${query}`,
    })
    const result = data ? data.data : []
    return result
  } catch (error) {
    console.error('Error fetching locations:', error)

    throw Error('Error fetching locations')
  }
}
