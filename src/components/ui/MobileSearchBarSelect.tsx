import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { CustomSelectItem } from '@/components/ui/CustomSelectItem'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { Typography } from '@/components/ui/Typography'
import { maxGuests } from '@/res/constants'
import { ChevronDownIcon } from '@/res/icons'
import { cn } from '@/utils/common'

interface IMobileSearchBarSelectProps {
  value?: string
  onSelect: (value: string) => void
}

export const MobileSearchBarSelect = ({
  value,
  onSelect,
}: IMobileSearchBarSelectProps) => {
  const [open, setOpen] = useState(false)

  const tr = useTranslations('searchBar')
  const guestsText = tr('guestsTemplate', { guestCount: value || '1' })

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="justify-between px-6 py-4 bg-gray-5 rounded-xl text-body-m font-medium text-gray-100 w-full hover:bg-gray-5"
      >
        {guestsText}
        <ChevronDownIcon className="size-6" />
      </Button>
      <div
        className={cn(
          'hidden flex-col h-full absolute left-0 right-0 top-0 bg-white z-40',
          open && 'flex'
        )}
      >
        <Typography
          variant="sub-title"
          color="text-gray-100"
          weight="font-semibold"
          className="px-4 mb-4"
        >
          {tr('chooseGuests')}
        </Typography>
        <RadioGroup
          value={value}
          onValueChange={onSelect}
          defaultValue="2"
          className="flex flex-col px-4 overflow-y-auto"
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((i) => {
            return (
              <CustomSelectItem
                key={`option-${i}`}
                value={i.toString()}
                label={tr('guestsTemplate', { guestCount: i })}
              />
            )
          })}
        </RadioGroup>
        <div className="flex px-4 pt-4 pb-5 shadow-drop-to-top">
          <Button onClick={() => setOpen(false)} className="px-8 py-3 grow">
            {tr('select')}
          </Button>
        </div>
      </div>
    </>
  )
}
