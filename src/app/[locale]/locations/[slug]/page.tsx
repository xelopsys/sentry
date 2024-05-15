import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { HotelList } from '@/components/common/HotelList'
import { LocationMap } from '@/components/common/LocationMap'
import { RichTextContent } from '@/components/common/RichTextContent'
// import { Faq } from '@/components/common/Faq'
import { SearchWrapper } from '@/components/common/SearchWrapper'
import { SimpleHeader } from '@/components/common/SimpleHeader'
import { FilterWrapper } from '@/components/filters/FilterWrapper'
import { getLocation } from '@/lib/getLocation'
import { getResultPageData } from '@/lib/getResultPageData'
import { defaultRevalidateSeconds } from '@/res/constants'
import { IHotelProps, IPageProps } from '@/types/common'
import { IStrapiItem } from '@/types/strapi'
import { formatText, getStrapiImage } from '@/utils/common'
import { getLocationUrl } from '@/utils/url'

export const revalidate = defaultRevalidateSeconds

export async function generateMetadata({
  params: { slug },
}: IPageProps): Promise<Metadata> {
  // fetch data
  const locationData = await getLocation({ slug })
  const target =
    locationData && locationData.length > 0
      ? locationData[0].attributes
      : undefined

  const resultPageData = await getResultPageData()
  const heroData = resultPageData.locationPageHero

  const title = formatText(heroData.titleTemplate, {
    locationTitle: target?.headerTitle,
  })
  const description = formatText(heroData.descriptionTemplate, {
    locationTitle: target?.headerTitle,
    locationName: target?.name,
    city: target?.city,
    country: target?.country,
  })

  return {
    title,
    description,
    alternates: {
      canonical: getLocationUrl(slug),
    },
  }
}

const Page = async ({ params: { slug } }: IPageProps) => {
  // Fetch data
  const resultPageData = await getResultPageData()

  // Fetch current location data
  const locationData = await getLocation({
    slug,
    populateHotels: ['coverImage', 'photos'],
  })
  const target =
    locationData && locationData.length > 0
      ? locationData[0].attributes
      : undefined
  const t = await getTranslations('locationTranslations')

  const locationPageTemplates = resultPageData.locationPageTemplates
  const heroData = resultPageData.locationPageHero
  const heroImage = getStrapiImage(heroData.backgroundImg.data)

  const title = formatText(heroData.titleTemplate, {
    locationTitle: target?.headerTitle,
  })

  const description = formatText(heroData.descriptionTemplate, {
    locationTitle: target?.headerTitle,
    locationName: target?.name,
    city: target?.city,
    country: target?.country,
  })

  const filterText = t('filterText', {
    locationTitle: target?.name,
    hotelsCount: target?.hotels.data.length,
  })

  const richTextTitle = formatText(locationPageTemplates.titleTemplate, {
    locationTitle: target?.name,
  })

  const richTextContent = formatText(locationPageTemplates.contentTemplate, {
    locationTitle: target?.name,
    city: target?.city,
    team: target?.meta?.team,
    country: target?.country,
  })

  // Map section
  let nearPlaces = []

  if (target && target.hotels) {
    nearPlaces = target.hotels.data
      .filter((h: IStrapiItem<IHotelProps>) => h.attributes.price)
      .map((hotel: IStrapiItem<IHotelProps>) => ({
        ...hotel.attributes,
        id: hotel.id,
      }))
  }

  // FAQ section
  // const faqData = resultPageData.locationFaq

  return (
    <main className="-mt-[101px] lg:-mt-[92px]">
      <SimpleHeader
        className="mb-1 lg:mb-6"
        title={title}
        description={description}
        image={heroImage}
        breadcrumbItems={[
          {
            label: target?.name,
          },
        ]}
      />

      <div className="container relative lg:grid lg:gap-5 xl:gap-[30px] lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-[minmax(0,_740px)_minmax(0,_549px)] xl:grid-cols-[minmax(0,_825px)_minmax(0,_549px)]">
        <div>
          <SearchWrapper location={target} />

          <FilterWrapper
            className="mt-5 mb-6"
            filterText={filterText}
            filterLabel={t('sortOrder')}
            filterOptions={[
              {
                label: t('topRated'),
                value: 'top-rated',
              },
              {
                label: t('priceAsc'),
                value: 'price-asc',
              },
              {
                label: t('priceDesc'),
                value: 'price-desc',
              },
              {
                label: t('distanceAsc'),
                value: 'distance-asc',
              },
            ]}
          />

          {target?.hotels && (
            <HotelList
              items={target?.hotels.data}
              locationCoordinates={target?.coordinates}
              locationName={target?.name}
              className="sm:grid sm:grid-cols-2 lg:flex"
            />
          )}

          <RichTextContent
            className="my-[60px] lg:my-[100px]"
            title={richTextTitle}
            content={richTextContent}
          />
        </div>

        <div className="hidden lg:flex sticky top-0 h-screen py-4">
          <LocationMap
            className="h-full"
            location={target?.coordinates}
            nearPlaces={nearPlaces}
          />
        </div>
      </div>

      {/* {faqData && faqData.items && faqData.items.length > 0 && (
        <Faq
          className="container mb-[60px] lg:mb-[100px]"
          title={faqData.title}
          items={faqData.items}
        />
      )} */}
    </main>
  )
}

export default Page
