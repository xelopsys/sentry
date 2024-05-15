import { Metadata } from 'next'

import { ClientReviews } from '@/components/common/ClientReviews'
// import { Faq } from '@/components/common/Faq'
import { FeaturedLocations } from '@/components/common/FeaturedLocations'
import { Hero } from '@/components/common/Hero'
import { NumbersStat } from '@/components/common/NumbersStat'
import { PopularLocations } from '@/components/common/PopularLocations'
// import { TopLocations } from '@/components/common/TopLocations'
import { getHomePageData } from '@/lib/getHomePageData'
import { defaultRevalidateSeconds } from '@/res/constants'
import {
  IStrapiFeaturedLocation,
  IStrapiPopularLocation,
  IStrapiReview,
  IStrapiTopLocation,
} from '@/types/strapi'
import { getStrapiImage } from '@/utils/common'
import { getLocationUrl } from '@/utils/url'

export const revalidate = defaultRevalidateSeconds

export async function generateMetadata(): Promise<Metadata> {
  // Fetch data
  const homeData = await getHomePageData()

  // Hero translations
  const heroData = homeData.hero

  return {
    title: heroData.title,
    description: heroData.description,
  }
}

export default async function Home() {
  // Fetch data
  const homeData = await getHomePageData()

  // Hero translations
  const heroData = homeData.hero
  const heroBackgroundImg = getStrapiImage(heroData.backgroundImg.data)

  // Popular locations
  const popularLocationsData = homeData.popularLocations
  if (popularLocationsData) {
    popularLocationsData.items = popularLocationsData.items.map(
      (item: IStrapiPopularLocation) => ({
        ...item,
        image: getStrapiImage(item.photo.data),
      })
    )
  }

  // Top locations
  const topLocationsData = homeData.topLocations
  // refine strapi photo prop to image
  if (topLocationsData) {
    topLocationsData.items = topLocationsData.items.map(
      (item: IStrapiTopLocation) => ({
        ...item,
        image: getStrapiImage(item.photo.data),
      })
    )
  }

  // Statistics section
  const statisticsData = homeData.statistics

  // Review section
  const reviewsData = homeData.testimonials

  // refine strapi photo prop to image
  if (reviewsData) {
    reviewsData.items = reviewsData.items.map((item: IStrapiReview) => ({
      ...item,
      image: getStrapiImage(item.photo.data),
    }))
  }

  // FAQ section
  // const faqData = homeData.faq

  // Featured targets section
  const featuredLocationsData = homeData.featuredLocations
  // refine strapi list items to match the item of the featuredTargets component
  if (featuredLocationsData && featuredLocationsData.locations) {
    featuredLocationsData.locations.data =
      featuredLocationsData.locations.data.map(
        (item: IStrapiFeaturedLocation) => ({
          id: item.id,
          label: item.attributes.name,
          path: getLocationUrl(item.attributes.slug),
        })
      )
  }
  return (
    <main className="h-full flex flex-col -mt-[101px]" id="search">
      {heroData && (
        <Hero
          title={heroData.title}
          description={heroData.description}
          backgroundImg={heroBackgroundImg}
        />
      )}
      <div className="overflow-hidden">
        {popularLocationsData && (
          <PopularLocations
            className="container my-[60px] lg:my-[100px]"
            title={popularLocationsData.title}
            items={popularLocationsData.items}
          />
        )}
        {/* {topLocationsData && (
          <TopLocations
            className="container mb-[60px] lg:my-[100px]"
            title={topLocationsData.title}
            items={topLocationsData.items}
          />
        )} */}
      </div>

      {statisticsData && (
        <NumbersStat
          className="container mb-[60px] lg:mb-[100px]"
          title={statisticsData.title}
          description={statisticsData.description}
          stats={statisticsData.items}
        />
      )}

      <div className="overflow-hidden">
        {reviewsData && (
          <ClientReviews
            className="container mb-[60px] lg:mb-[100px]"
            title={reviewsData.title}
            items={reviewsData.items}
          />
        )}
      </div>

      {/* {faqData && (
        <Faq
          className="container mb-[60px] lg:mb-[100px]"
          title={faqData.title}
          items={faqData.items}
        />
      )} */}

      {featuredLocationsData && featuredLocationsData.locations.data && (
        <FeaturedLocations
          className="container mb-[60px] lg:mb-[100px]"
          title={featuredLocationsData.title}
          items={featuredLocationsData.locations.data}
        />
      )}
    </main>
  )
}
