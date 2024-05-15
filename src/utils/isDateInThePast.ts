export function isDateInThePast(date: Date): boolean {
  const currentDate = new Date()
  // Set hours, minutes, seconds, and milliseconds to 0 for both dates to compare only dates
  const normalizedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  )
  const normalizedCurrentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  )

  return normalizedDate < normalizedCurrentDate
}
