export const getDefaultLocationsData = async () => {
  try {
    const data = await fetch(`/api/default-locations`, {
      cache: 'no-store',
    })
    const result = await data.json()

    const content = result.data
    const defaultLocations = content?.searchBar?.defaultLocations

    return defaultLocations && defaultLocations?.data.length > 0
      ? defaultLocations.data
      : []
  } catch (error) {
    console.error('Error fetching default locations:', error)
  }
}
