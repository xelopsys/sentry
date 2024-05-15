import { Metadata } from 'next'

import { SimpleHeader } from '@/components/common/SimpleHeader'
import { ContactForm } from '@/components/form/ContactForm'
import { RichText } from '@/components/ui/RichText'
import { Typography } from '@/components/ui/Typography'
import { getContactPageData } from '@/lib/getContactPageData'
import { getStrapiImage } from '@/utils/common'
import { PATH_CONTACT } from '@/utils/url'

export const metadata: Metadata = {
  alternates: {
    canonical: PATH_CONTACT,
  },
}

const Page = async () => {
  // Fetch data
  const contactData = (await getContactPageData()) || null

  if (!contactData || !contactData.hero || !contactData.contact) {
    return null
  }

  const backgroundImg = getStrapiImage(contactData.hero.backgroundImg.data)

  return (
    <>
      <main className="-mt-[101px] lg:-mt-[92px]">
        <SimpleHeader
          title={contactData.hero.title}
          description={contactData.hero.description}
          image={backgroundImg}
          breadcrumbItems={[{ label: contactData.breadcrumbWord }]}
          isBgGradient={false}
          className="min-h-[500px]"
          classNameTitle="lg:text-h1 max-w-none"
          classNameDescription="max-w-[670px] mx-auto"
          classNameTextWrapper="pt-[92px] lg:pt-0"
        />
        <div className="container my-[60px] lg:my-[100px] flex flex-col gap-10 lg:flex-row lg:gap-[60px] lg:items-start">
          <div className="max-w-[630px] grow w-full">
            <Typography
              variant="sub-header"
              weight="font-semibold"
              color="text-gray-100"
              className="lg:text-h2"
            >
              {contactData.contact.title}
            </Typography>
            <Typography
              variant="body-s"
              color="text-gray-100"
              weight="font-normal"
              className="mt-5 max-w-[555px] lg:text-body-m"
            >
              {contactData.contact.description}
            </Typography>
            <div className="flex gap-[35px] mt-5 lg:mt-[30px] lg:grid lg:grid-cols-2 lg:gap-5">
              <div className="w-full grow">
                <Typography
                  variant="body-s"
                  weight="font-semibold"
                  color="text-gray-100"
                  className="lg:text-body-m"
                >
                  {contactData.contact.postalTitle}
                </Typography>
                <Typography
                  variant="body-s"
                  weight="font-normal"
                  color="text-gray-100"
                  className="mt-4 lg:text-body-m"
                >
                  <RichText content={contactData.contact.postalDescription} />
                </Typography>
              </div>

              {/* <div>
              <Typography
                variant="body-s"
                weight="font-semibold"
                color="text-gray-100"
                className="lg:text-body-m"
              >
                {contactData.contact.contactsTitle}
              </Typography>
              <div className="mt-4 flex flex-col">
                <Link
                  className="p-0 !text-body-s font-normal lg:!text-body-m text-gray-100"
                  href={`tel:${contactData.contact.phone.trim().replace(/\s/g, '')}`}
                >
                  {contactData.contact.phone}
                </Link>
                <Link
                  className="p-0 !text-body-s font-normal lg:!text-body-m text-gray-100"
                  href={`mailto:${contactData.contact.email}`}
                >
                  {contactData.contact.email}
                </Link>
              </div>
            </div> */}
            </div>
          </div>

          <ContactForm className="w-full grow" />
        </div>
      </main>
    </>
  )
}

export default Page
