import { Metadata } from 'next'

import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { RichText } from '@/components/ui/RichText'
import { Typography } from '@/components/ui/Typography'
import { getPrivacyPageData } from '@/lib/getPrivacyPageData'
import { PATH_PRIVACY } from '@/utils/url'

export const metadata: Metadata = {
  alternates: {
    canonical: PATH_PRIVACY,
  },
}

const Page = async () => {
  // Fetch data
  const privacyData = (await getPrivacyPageData()) || null

  if (!privacyData) {
    return null
  }

  return (
    <main className="">
      <Breadcrumbs
        items={[
          {
            label: privacyData.breadcrumbWord,
          },
        ]}
        textColor="text-gray-100"
        className="mt-5"
      />
      <div className="container flex flex-col mt-[30px] mb-[60px] lg:mt-10 lg:mb-[100px]">
        <Typography
          tag="h3"
          variant="h3"
          color="text-gray-100"
          weight="font-semibold"
        >
          {privacyData.pageTitle}
        </Typography>
        <time className="text-body-s font-normal text-gray-60 mt-2 mb-5">
          {privacyData.privacyPolicy.lastUpdatedText}
        </time>
        <Typography
          variant="body-s"
          color="text-gray-100"
          weight="font-normal"
          className="mb-[30px] lg:mb-[50px] lg:text-body-m"
        >
          {privacyData.privacyPolicy.smallDescription}
        </Typography>
        <RichText content={privacyData.privacyPolicy.content} />
      </div>
    </main>
  )
}

export default Page
