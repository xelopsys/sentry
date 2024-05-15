import { Carousel, CarouselContent } from '@/components/ui/Carousel'
import { GradientCard } from '@/components/ui/GradientCard'
import { Typography } from '@/components/ui/Typography'
import { IPeopleProps } from '@/types/common'
import { cn } from '@/utils/common'

interface IOurTeamProps {
  people: IPeopleProps[]
  title: string
  description: string
  className?: string
}

export const OurTeam = ({
  people,
  title,
  description,
  className,
}: IOurTeamProps) => {
  const clsx = cn('flex flex-col', className)
  const clsxList = cn(
    'ml-0 grid gap-4 grid-flow-col auto-cols-[328px]',
    'lg:gap-5 lg:auto-cols-[325px]'
  )

  return (
    <section className={clsx}>
      <Typography
        variant="sub-header"
        color="text-gray-100"
        weight="font-semibold"
        className="lg:text-h2 lg:text-center"
      >
        {title}
      </Typography>
      <Typography
        variant="body-s"
        color="text-gray-100"
        weight="font-normal"
        className="my-5 max-w-[812px] lg:mx-auto lg:text-body-m lg:text-center lg:mb-10"
      >
        {description}
      </Typography>
      <Carousel
        opts={{
          align: 'center',
          active: true,
          breakpoints: {
            '(min-width: 1440px)': { active: false },
          },
        }}
      >
        <CarouselContent className={clsxList}>
          {people &&
            people.length > 0 &&
            people.map((people) => (
              <GradientCard
                key={people.name}
                name={people.name}
                subName={people.position}
                image={people.image}
                url=""
                className="h-[500px] pointer-events-none"
              />
            ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
