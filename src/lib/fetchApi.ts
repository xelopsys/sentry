import { defaultRevalidateSeconds } from '@/res/constants'
import { IStrapiItem, IStrapiResponse } from '@/types/strapi'

interface IFetchApi {
  route: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
}

export const fetchApi = async ({ route, method = 'GET', body }: IFetchApi) => {
  const getAdditionalQuery =
    method === 'GET'
      ? `&filters[tenant][id][$eq]=${process.env.NEXT_PUBLIC_TENANT_ID}`
      : ''

  const raw = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${route}${getAdditionalQuery}`,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TENANT_API_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : undefined,
      next: {
        revalidate: defaultRevalidateSeconds,
      },
    }
  )

  return (await raw.json()) as IStrapiResponse<IStrapiItem<any>[]>
}
