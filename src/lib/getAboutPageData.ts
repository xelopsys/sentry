import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

const query = qs.stringify({
  populate: [
    'hero.backgroundImg',
    'features.items',
    'features.image',
    'team.items.image',
    'testimonials.items.photo',
  ],
})

export const getAboutPageData = async () => {
  try {
    const response = await fetchApi({
      route: `about-us-pages?${query}`,
    })

    const result =
      response && response.data.length > 0 ? response.data[0].attributes : {}
    return result
  } catch (error) {
    console.error('Error fetching about-us-pages:', error)

    throw Error('Error fetching about-us-pages')
  }
}
