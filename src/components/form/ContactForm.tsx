'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { cn } from '@/utils/common'

const FormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(3),
})

type ValidationSchema = z.infer<typeof FormSchema>

interface IContactFormProps {
  className?: string
}

export const ContactForm = ({ className }: IContactFormProps) => {
  const defaultValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }

  const [loading, setLoading] = useState(false)

  const form = useForm<ValidationSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  // Translations
  const tr = useTranslations('contactForm')
  const trMessages = useTranslations('formMessages')

  const toastSuccess = () => {
    toast(trMessages('successTitle'), {
      description: trMessages('successDescription'),
      closeButton: true,
    })
  }

  const toastError = () => {
    toast(trMessages('errorTitle'), {
      description: trMessages('errorDescription'),
      closeButton: true,
    })
  }

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      setLoading(true)

      // Send data to the server
      const response = await fetch('/api/inquery', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const res = await response.json()

      if (res.success) {
        toastSuccess()
      } else {
        toastError()
      }
    } catch (error) {
      console.error(error)

      toastError()
    } finally {
      setLoading(false)
      form.reset()
    }
  }

  const clsx = cn(
    'flex flex-col gap-2 bg-gray-5 p-4 rounded-3xl lg:p-8 lg:gap-4',
    className
  )

  return (
    <Form {...form}>
      <form
        title="Conact form"
        className={clsx}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 md:flex-row lg:gap-4">
          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl className="w-full">
                  <Input
                    className={cn(
                      'px-6 py-4 rounded-xl hover:bg-white',
                      form.formState.errors['name'] && 'ring-2 ring-red-100'
                    )}
                    {...field}
                    placeholder={tr?.name}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl className="w-full">
                  <Input
                    className={cn(
                      'px-6 py-4 rounded-xl hover:bg-white',
                      form.formState.errors['email'] && 'ring-2 ring-red-100'
                    )}
                    {...field}
                    placeholder={tr('email')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name={'subject'}
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full">
                <Input
                  className="px-6 py-4 rounded-xl hover:bg-white"
                  {...field}
                  placeholder={tr('subject')}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'message'}
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full">
                <Textarea
                  className={cn(
                    'px-6 py-4 rounded-xl hover:bg-white min-h-32',
                    form.formState.errors['message'] && 'ring-2 ring-red-100'
                  )}
                  {...field}
                  placeholder={tr('message')}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="self-start px-8 py-3 mt-2 lg:mt-3"
          type="submit"
          disabled={loading}
        >
          {tr('buttonLabel')}
        </Button>
      </form>
    </Form>
  )
}
