export const getAllLocationsQuery = async (q = '') => {
  try {
    const data = await fetch(`/api/locations?q=${q}`, {
      cache: 'no-store',
    })
    const result = await data.json()
    return result.data
  } catch (error) {
    console.error('Error fetching locations:', error)
  }
}
