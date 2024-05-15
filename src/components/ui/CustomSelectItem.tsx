import { Label } from '@/components/ui/Label'
import { RadioGroupItem } from '@/components/ui/RadioGroup'
import { CheckIcon } from '@/res/icons'

interface ICustomSelectItemProps {
  value: string
  label: string
}

export const CustomSelectItem = ({ value, label }: ICustomSelectItemProps) => {
  return (
    <Label className="flex cursor-pointer">
      <RadioGroupItem
        className="invisible size-0 [&[data-state=checked]~span]:bg-primary-10 [&[data-state=checked]~span>svg]:block"
        value={value}
      />
      <span className="grow inline-flex justify-between text-body-m text-gray-100 p-4 rounded-xl bg-gray-5">
        {label}
        <CheckIcon className="hidden size-6" />
      </span>
    </Label>
  )
}
