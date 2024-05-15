import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import { DollarIcon, EuroIcon, PoundIcon } from '@/res/icons'
import { ICurrencyProps } from '@/types/common'
import { cn } from '@/utils/common'
interface ICurrencyChangerProps {
  currencies: ICurrencyProps[]
  theme?: 'light' | 'dark'
}

export const CurrencyChanger = ({
  currencies,
  theme,
}: ICurrencyChangerProps) => {
  const isDarkTheme = theme === 'dark'
  const clsx = cn(
    'min-w-[100px] flex bg-white/20 hover:bg-white/40 transition-color backdrop-blur bg-opacity-10 px-4 py-2 gap-2.5 rounded-full focus-within:ring-primary-100 focus-within:ring-inset focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0 !important',
    isDarkTheme && '!bg-gray-5 hover:!bg-gray-10'
  )

  const { currency, setCurrency } = useCurrencyStore()
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrencyProps>(
    currencies.find((c) => c.value === currency) || currencies[0]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={clsx}>
        <span className={cn('text-white', isDarkTheme && 'text-gray-100')}>
          {currencyIconSwitch(selectedCurrency.value)}
        </span>
        <span
          className={cn(
            'text-base font-medium text-white uppercase',
            isDarkTheme && 'text-gray-100'
          )}
        >
          {selectedCurrency.label}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'bg-white/20 backdrop-blur rounded-lg border-none min-w-[104px]',
          isDarkTheme && 'bg-gray-20'
        )}
      >
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.value}
            onSelect={() => {
              setSelectedCurrency(currency)
              setCurrency(currency.value)
            }}
            className={cn(
              'font-normal flex items-center justify-center gap-2 text-white hover:bg-white/20 rounded-md',
              isDarkTheme && 'text-gray-100 hover:bg-white'
            )}
          >
            {currencyIconSwitch(currency.value)} {currency.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const currencyIcons = {
  usd: <DollarIcon className="size-6" />,
  eur: <EuroIcon className="size-6" />,
  gbp: <PoundIcon className="size-6" />,
}

export const currencyIconSwitch = (currency: string) =>
  currencyIcons[currency as keyof typeof currencyIcons]
