import { Metadata } from 'next'

import { FeaturedLocations } from '@/components/common/FeaturedLocations'
import { getFeaturedLocations } from '@/lib/getFeaturedLocations'
import { IStrapiFeaturedLocation } from '@/types/strapi'
import { getLocationUrl, PATH_LOCATIONS } from '@/utils/url'

export const metadata: Metadata = {
  alternates: {
    canonical: PATH_LOCATIONS,
  },
}

const Page = async () => {
  // Fetch data from the API
  const locationsData = await getFeaturedLocations()

  // Featured targets section
  const featuredLocationsData = locationsData.featuredLocations
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
    <div className="container">
      {featuredLocationsData && featuredLocationsData.locations.data && (
        <FeaturedLocations
          usedInLocationsPage
          className="container mb-[60px] lg:mb-[100px]"
          title={featuredLocationsData.title}
          items={featuredLocationsData.locations.data}
        />
      )}
    </div>
  )
}

export default Page
