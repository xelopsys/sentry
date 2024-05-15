interface IGetProviderBaseUrl {
  providerLanguage?: string
}

export const getProviderBaseUrl = ({
  providerLanguage = 'en-us',
}: IGetProviderBaseUrl) => {
  return `https://www.booking.com/searchresults.${providerLanguage}.html`
}
