import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Aminities } from '@/components/common/Aminities'
import { BookingWidgetWrapper } from '@/components/common/BookingWidgetWrapper'
import { Faq } from '@/components/common/Faq'
import { HotelHeader } from '@/components/common/HotelHeader'
import { HotelList } from '@/components/common/HotelList'
import { HotelMap } from '@/components/common/HotelMap'
import { ImageGallery } from '@/components/common/ImageGallery'
import { RichTextContent } from '@/components/common/RichTextContent'
import { Divider } from '@/components/ui/Divider'
import { Typography } from '@/components/ui/Typography'
import { getHotel } from '@/lib/getHotel'
import { getHotelPageData } from '@/lib/getHotelPageData'
import { defaultRevalidateSeconds } from '@/res/constants'
import { IFaqProps, IPageProps } from '@/types/common'
import { IStrapiImage } from '@/types/strapi'
import { formatText, getStrapiImage } from '@/utils/common'
import { distanceCalc } from '@/utils/distanceCalc'
import { getHotelUrl, getLocationUrl } from '@/utils/url'

export const revalidate = defaultRevalidateSeconds

export async function generateMetadata({
  params: { slug },
}: IPageProps): Promise<Metadata> {
  // fetch data
  const hotel = await getHotel({ slug })

  return {
    title: hotel[0]?.attributes?.name,
    alternates: {
      canonical: getHotelUrl(hotel[0]?.attributes?.slug),
    },
  }
}

const Page = async ({
  params: { slug },
}: {
  params: {
    slug: string
  }
}) => {
  // Fetch data
  const hotelPageData = await getHotelPageData()
  const hotelData = await getHotel({ slug })
  // FAQ section
  let faqData = hotelPageData?.hotelFaqTemplate
  // Hotels section
  const t = await getTranslations('hotelTranslations')
  const hotelPageTemplates = hotelPageData?.hotelPageTemplates
  const data = hotelData && hotelData.length > 0 ? hotelData[0].attributes : {}

  data.id = hotelData[0]?.id

  // Related location to the hotel
  const relatedLocation = data.location?.data?.attributes

  const hotelListTitle = t('hotelListTitle', {
    locationTitle: relatedLocation?.name,
  })

  const hotelOverview = formatText(hotelPageTemplates.titleTemplate, {
    hotelName: data.name,
  })

  const hotelDescription = formatText(hotelPageTemplates.contentTemplate, {
    locationName: relatedLocation?.name,
    hotelName: data.name,
    city: relatedLocation?.city,
    country: relatedLocation?.country,
    numberOfRooms: data.numberOfRooms,
    stars: data.rating?.stars,
    reviewScore: data.rating?.review_score,
  })

  const fullAddress = `${data.locationAddress}, ${relatedLocation?.city}, ${relatedLocation?.country}`

  let images = []
  if (data.photos) {
    images = data.photos.data.map((item: IStrapiImage) => getStrapiImage(item))
  }

  const relatedHotels = relatedLocation?.hotels?.data?.slice(0, 10)

  // Refactor into a separate function
  const { drivingTime } = distanceCalc(
    data.coordinates,
    relatedLocation?.coordinates
  )

  faqData = faqData?.map((item: IFaqProps) => {
    const question = formatText(item.question, {
      hotelName: data.name,
      locationName: relatedLocation.name,
    })

    const answer = formatText(item.answer, {
      hotelName: data.name,
      locationName: relatedLocation.name,
      drivingTime,
      hotelAddress: fullAddress,
    })

    return {
      ...item,
      question,
      answer,
    }
  })

  return (
    <main className="-mt-[101px] lg:-mt-[92px]">
      <HotelHeader
        className="container"
        name={data.name}
        address={fullAddress}
        rating={data.rating?.stars}
        reviewsCount={data.rating?.number_of_reviews}
        reviewScore={data.rating?.review_score}
        breadcrumbItems={[
          {
            label: relatedLocation?.name,
            link: getLocationUrl(relatedLocation?.slug),
          },
          {
            label: data.name,
          },
        ]}
      />
      <div className="container mt-5 grid items-start gap-4 xl:gap-[30px] lg:grid-cols-[minmax(0,_900px)_minmax(0,_430px)]">
        <div className="overflow-hidden">
          <ImageGallery items={images} />

          <RichTextContent
            className="mt-8 lg:mb-10"
            classNameTitle="text-sub-header mb-5"
            title={hotelOverview}
            content={hotelDescription}
          />

          <Divider className="my-8" />

          <Aminities title={t('amenitiesTitle')} items={data?.facilities} />

          <Divider className="my-8" />

          <HotelMap
            location={data.coordinates}
            title={data.name}
            address={fullAddress}
            priceCategory={data.priceCategory}
          />

          <Divider className="my-8 hidden sm:block" />

          <div className="max-w-[780px]">
            <Typography
              tag="h2"
              variant="sub-header"
              color="text-gray-100"
              weight="font-semibold"
            >
              {hotelListTitle}
            </Typography>
            <HotelList
              locationCoordinates={relatedLocation?.coordinates}
              locationName={relatedLocation?.name}
              items={relatedHotels}
              hotelSourceId={data.sourceId}
              className="mb-[60px] lg:mb-10 py-0 mt-[30px] border-y-0"
            />
          </div>

          {faqData && (
            <Faq
              items={faqData}
              title={faqData.title}
              className="mb-[60px] lg:mb-[100px]"
            />
          )}
        </div>

        <BookingWidgetWrapper
          propertyData={data}
          className="lg:sticky lg:top-4 xl:top-6"
        />
      </div>
    </main>
  )
}

export default Page
