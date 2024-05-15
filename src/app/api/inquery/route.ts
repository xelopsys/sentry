import { NextRequest, NextResponse } from 'next/server'

import { fetchApi } from '@/lib/fetchApi'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const rawData = {
    data: {
      ...body,
      tenant: Number(process.env.NEXT_PUBLIC_TENANT_ID),
    },
  }

  try {
    await fetchApi({
      route: 'contact-inquiries',
      method: 'POST',
      body: rawData,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending contact form:', error)

    return NextResponse.json({ success: false })
  }
}
