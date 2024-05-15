import { Metadata } from 'next'
import Image from 'next/image'

import { AboutBenefits } from '@/components/common/AboutBenefits'
import { ClientReviews } from '@/components/common/ClientReviews'
// import { OurTeam } from '@/components/common/OurTeam'
import { SimpleHeader } from '@/components/common/SimpleHeader'
import { Typography } from '@/components/ui/Typography'
import { getAboutPageData } from '@/lib/getAboutPageData'
import { IStrapiReview } from '@/types/strapi'
import { getStrapiImage } from '@/utils/common'
import { PATH_ABOUT } from '@/utils/url'

export const metadata: Metadata = {
  alternates: {
    canonical: PATH_ABOUT,
  },
}

const Page = async () => {
  // Fetch data
  const aboutData = (await getAboutPageData()) || null

  if (!aboutData || !aboutData.hero || !aboutData.features || !aboutData.team) {
    return null
  }

  // Images
  const bgImage = getStrapiImage(aboutData.hero.backgroundImg.data)
  const featureImage = getStrapiImage(aboutData.features.image.data)

  // Hero section
  const heroData = aboutData.hero

  // Features section
  const featuresData = aboutData.features

  // // Team section
  // const teamData = aboutData.team
  // const teamList = aboutData.team.items.map(
  //   (
  //     item: Omit<IPeopleProps, 'image'> & { image: { data: IStrapiImage } }
  //   ) => ({
  //     ...item,
  //     image: getStrapiImage(item.image.data),
  //   })
  // )

  // Testimonials section
  const testimonialsData = aboutData.testimonials
  // refine strapi photo prop to image
  if (testimonialsData) {
    testimonialsData.items = testimonialsData.items.map(
      (item: IStrapiReview) => ({
        ...item,
        image: getStrapiImage(item.photo.data),
      })
    )
  }

  return (
    <main className="-mt-[101px] lg:-mt-[92px]">
      <SimpleHeader
        title={heroData.title}
        description={heroData.description}
        image={bgImage}
        breadcrumbItems={[
          {
            label: aboutData.breadcrumbWord,
          },
        ]}
        variant="big"
        classNameTitle="lg:text-h1 max-w-none"
      />
      <section className="flex flex-col gap-[60px] lg:gap-[100px] my-[60px] lg:my-[100px] container">
        <div>
          <Typography
            variant="sub-header"
            color="text-gray-100"
            weight="font-semibold"
            className="lg:text-h2 lg:text-center"
          >
            {featuresData.title}
          </Typography>
          <Typography
            variant="body-s"
            color="text-gray-100"
            weight="font-normal"
            className="mt-5 lg:text-body-m lg:text-center max-w-[812px] lg:mx-auto"
          >
            {featuresData.description}
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">
          <AboutBenefits items={featuresData.items} />
          <div className="relative h-[500px] rounded-3xl overflow-hidden">
            <Image src={featureImage} fill className={'object-cover'} alt="" />
          </div>
        </div>
      </section>

      {/* <OurTeam
        people={teamList}
        title={teamData.title}
        description={teamData.description}
        className="container my-[60px] lg:my-[100px]"
      /> */}

      <div className="overflow-hidden">
        <ClientReviews
          className="container mb-[60px] lg:mb-[100px]"
          title={testimonialsData.title}
          items={testimonialsData.items}
        />
      </div>
    </main>
  )
}

export default Page
