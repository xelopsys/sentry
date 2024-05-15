import { useQuery } from '@tanstack/react-query'
import { useTranslations as getTranslations } from 'next-intl'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Skeleton } from '@/components/ui/Skeleton'
import { Typography } from '@/components/ui/Typography'
import { useClickOutside } from '@/hooks/useClickOutside'
import { getAllLocationsQuery } from '@/lib/getAllLocationsQuery'
import { getDefaultLocationsData } from '@/lib/getDefaultLocationsData'
import { useTranslations } from '@/providers/Providers'
import { CloseIcon, MarkerPinIcon } from '@/res/icons'
import { ILocationProps } from '@/types/common'
import { IStrapiItem } from '@/types/strapi'
import { cn } from '@/utils/common'
import { debounce } from '@/utils/debounce'

interface ISearchBarInputProps {
  value?: ILocationProps
  onChange: (value: ILocationProps | undefined) => void
  onClear: () => void
  error: boolean
  className?: string
  classNameInput?: string
  isMobileSearchBar?: boolean
}

export const SearchBarInput = forwardRef<
  HTMLInputElement,
  ISearchBarInputProps
>((params: ISearchBarInputProps, ref) => {
  const {
    value,
    onChange,
    onClear,
    error,
    className,
    classNameInput,
    isMobileSearchBar,
  } = params

  const [targetName, setTargetName] = useState<string>(value?.headerTitle || '')
  const [open, setOpen] = useState(false)
  const [locationsLoading, setLocationsLoading] = useState(false)

  // Fetch data
  const { data: defaultLocations, isLoading } = useQuery({
    queryKey: ['default-locations'],
    queryFn: async () => {
      return await getDefaultLocationsData()
    },
  })

  const [locations, setLocations] = useState<IStrapiItem<ILocationProps>[]>([])

  const listOfLocations = targetName.length === 0 ? defaultLocations : locations

  // Debounce fetch data
  const debouncedRefetch = debounce(async (value: string) => {
    setLocationsLoading(true)

    const data = await getAllLocationsQuery(value)
    data && setLocations(data)

    setLocationsLoading(false)
  }, 500)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTargetName(value)
    onChange(undefined)

    value.length > 0 && debouncedRefetch(value)
  }

  const wrapperRef = useRef<HTMLDivElement>(null)
  useClickOutside(wrapperRef, () => setOpen(false))

  const isListOpen = (open || error) && listOfLocations.length > 0

  useEffect(() => {
    if (error) {
      setTargetName('')
    }
  }, [error])

  useEffect(() => {
    if (value === undefined) {
      setTargetName('')
    }
  }, [value])

  const tr = useTranslations('searchBar')
  const t = getTranslations('searchBar')

  const clsx = cn(
    isMobileSearchBar ? 'static' : 'relative group z-[60]',
    className
  )

  const clsxInput = cn(
    'rounded-lg w-full px-6 py-4 pr-12 md:rounded-r-none lg:px-6 lg:py-5 peer',
    error && 'ring-2 ring-red-100 placeholder:text-red-100',
    classNameInput
  )
  const clsxDropdown = cn(
    'bg-white py-2.5 max-h-80 overflow-y-auto shadow-drop-to-bottom flex flex-col rounded-lg border border-gray-20 absolute top-full mt-2 max-w-[400px] w-full',
    isMobileSearchBar &&
      'left-0 right-0 w-full h-screen rounded-none border-none shadow-none max-h-screen max-w-none'
  )

  return (
    <div ref={wrapperRef} className={clsx}>
      <Input
        value={targetName}
        onChange={handleInputChange}
        className={clsxInput}
        placeholder={error ? t('errors.query') : tr.inputPlaceholder}
        onFocus={() => setOpen(true)}
        ref={ref}
      />
      {targetName.length > 0 && (
        <Button
          variant="ghost"
          className={cn(
            'invisible flex p-0 h-auto absolute z-10 top-1/2 -translate-y-1/2 right-6 hover:bg-transparent md:right-4',
            'group-hover:visible peer-focus:visible'
          )}
          onClick={() => {
            onClear()
            setTargetName('')
          }}
        >
          <CloseIcon className="size-6 text-gray-60" />
        </Button>
      )}
      {isListOpen && (
        <div className={clsxDropdown}>
          {(isLoading || locationsLoading) && <LocationSkeletons />}
          {!locationsLoading &&
            listOfLocations &&
            listOfLocations.length > 0 &&
            listOfLocations.map(
              ({ id, attributes: target }: IStrapiItem<ILocationProps>) => (
                <Button
                  variant="ghost"
                  key={id}
                  className="justify-start cursor-pointer hover:bg-gray-10 flex px-4 py-2 gap-3 transition-colors relative"
                  onClick={() => {
                    onChange(target)
                    setTargetName(target.headerTitle)
                    setOpen(false)
                  }}
                >
                  <span className="bg-gray-5 w-[42px] h-[42px] rounded-lg flex items-center justify-center shrink-0">
                    <MarkerPinIcon className="h-6 w-6 text-gray-70" />
                  </span>
                  <div className="text-left ml-0.5">
                    <Typography
                      tag="h3"
                      variant="body-s"
                      weight="font-medium"
                      color="text-gray-100"
                      className="truncate max-w-[270px]"
                    >
                      {target.headerTitle}
                    </Typography>
                    <Typography
                      weight="font-medium"
                      color="text-gray-60"
                      variant="body-xs"
                    >
                      {target.country}, {target.city}
                    </Typography>
                  </div>
                </Button>
              )
            )}
        </div>
      )}
    </div>
  )
})

SearchBarInput.displayName = 'SearchBarInput'

export const LocationSkeletons = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <div
      key={index}
      className="justify-start flex px-4 py-2 gap-3 relative w-full"
    >
      <Skeleton className="w-[42px] h-[42px] rounded-lg shrink-0" />
      <div className="flex flex-col justify-start gap-1 grow w-full">
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-1/2 rounded-lg" />
      </div>
    </div>
  ))
}
