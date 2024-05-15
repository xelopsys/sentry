import { ICoordinatesProps } from '@/types/common'

export const distanceCalc = (
  point1: ICoordinatesProps,
  point2: ICoordinatesProps
) => {
  const R = 6371e3 // Earth radius

  const phi1 = (point1?.latitude * Math.PI) / 180 // Values in radians
  const phi2 = (point2?.latitude * Math.PI) / 180

  const deltaPhi = ((point2?.latitude - point1?.latitude) * Math.PI) / 180
  const deltaLambda = ((point2?.longitude - point1?.longitude) * Math.PI) / 180

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const d = R * c // Distance in meters

  // Travel time in minutes by walking
  const walkingTime = d / 1.4 / 60
  // Calculate driving distance in kilometers
  // Assuming average driving speed of 50 km/h
  const drivingTime = (d / 1000 / 50) * 60

  return {
    walkingTime: Math.ceil(walkingTime),
    drivingTime: Math.ceil(drivingTime),
  }
}
