export function formatNumber(
  number: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  try {
    const formatter = new Intl.NumberFormat(locale, options)
    return formatter.format(number)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error formatting number: ${error.message}`)
    }

    return `${number}`
  }
}
