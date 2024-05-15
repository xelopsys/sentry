import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

const query = qs.stringify({
  populate: ['hero.backgroundImg', 'contact.form'],
})

export const getContactPageData = async () => {
  try {
    const response = await fetchApi({
      route: `contact-pages?${query}`,
    })

    const result =
      response && response.data.length > 0 ? response.data[0].attributes : {}
    return result
  } catch (error) {
    console.error('Error fetching contact-pages:', error)

    throw Error('Error fetching contact-pages')
  }
}
