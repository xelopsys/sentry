import { NextResponse } from 'next/server'
import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

const query = qs.stringify({
  populate: ['searchBar.defaultLocations'],
})

export const GET = async () => {
  try {
    const response = await fetchApi({
      route: `website-commons?${query}`,
    })

    const result =
      response && response.data.length > 0 ? response.data[0].attributes : {}

    return NextResponse.json(
      {
        success: true,
        data: result,
        error: null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching default locations:', error)

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: 'Error fetching default locations',
      },
      {
        status: 500,
      }
    )
  }
}
