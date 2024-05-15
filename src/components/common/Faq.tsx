import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion'
import { Typography } from '@/components/ui/Typography'
import { IFaqProps } from '@/types/common'
import { cn } from '@/utils/common'

interface IFaqSectionProps {
  title: string
  items: IFaqProps[]
  className?: string
}

export const Faq = ({ title, items, className }: IFaqSectionProps) => {
  const clsx = cn('flex flex-col', className)
  return (
    <section className={clsx}>
      <Typography
        tag="h2"
        variant="sub-header"
        color="text-gray-100"
        weight="font-semibold"
        className="mb-6 lg:text-h2 lg:mb-[30px]"
      >
        {title}
      </Typography>
      <Accordion type="single" collapsible className="flex flex-col gap-2">
        {items &&
          items.length > 0 &&
          items.map((faq) => (
            <AccordionItem
              className="bg-gray-5 rounded-3xl border-none p-4 lg:p-5"
              value={String(faq.id)}
              key={faq.id}
              title={faq.question}
            >
              <AccordionTrigger className="gap-4 p-0 !font-semibold !text-body-s text-left lg:!text-title hover:no-underline text-gray-100">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-normal text-body-s mt-4 lg:mt-2 lg:text-body-m max-w-[1225px]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </section>
  )
}
