import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

export const GET = async (req: NextRequest) => {
  const q = req.nextUrl.searchParams.get('q')

  try {
    const fields = ['slug', 'name', 'city', 'country', 'headerTitle']

    const query = qs.stringify(
      {
        fields,
        filters: {
          $or: fields.map((field) => ({ [field]: { $containsi: q } })),
        },
        pagination: {
          limit: 20,
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    const response = await fetchApi({
      route: `locations?${query}`,
    })

    return NextResponse.json(
      {
        success: true,
        data: response.data,
        error: null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching locations:', error)

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: 'Error fetching locations',
      },
      {
        status: 500,
      }
    )
  }
}
