import Hotjar from '@hotjar/browser'

// Google Analytics events
const GA_SEARCH_BUTTON_CLICKED = 'bmt_search_button_clicked'
const GA_CLICKOUT = 'bmt_clickout'

/**
 * Google Analytics tracking
 */
const recordGAEvent = (eventName: string, params?: object) => {
  if (!window) {
    return
  }
  window.gtag('event', eventName, params)
}

export const recordSearchButtonClicked = (
  locationSlug: string,
  bookingWindow?: number,
  lengthOfStay?: number
) => {
  recordGAEvent(GA_SEARCH_BUTTON_CLICKED, {
    location_slug: locationSlug,
    booking_window: bookingWindow,
    length_of_stay: lengthOfStay,
  })
  Hotjar.event(GA_SEARCH_BUTTON_CLICKED)
}

type TClickoutElement =
  | 'home-search'
  | 'location-search'
  | 'location-card'
  | 'hotel-availability'
  | 'hotel-recommeded'
  | 'hotel-map'
  | 'hotel-images'

export const recordClickout = (element: TClickoutElement, hotelId?: number) => {
  recordGAEvent(GA_CLICKOUT, {
    clickout_element: element,
    hotel_id: hotelId,
  })
  Hotjar.event(GA_CLICKOUT)
}
