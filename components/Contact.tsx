import { FC } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ButtonAppearance from '@/components/ButtonAppearance'
import FormBase from '@/components/Form/Base'
import FormError from '@/components/Form/Error'
import FormField from '@/components/Form/Field'
import FormInput from '@/components/Form/Input'

interface Contact {
  title?: string
}

interface Props {
  blok: any
}

const schema = z.object({
  name: z.string().trim().nonempty('Name is required').default(''),
  email: z
    .string()
    .trim()
    .nonempty('Email address is required')
    .email({ message: 'Email address must be valid' })
    .default(''),
  company: z.string().trim().nonempty('Name is required').default(''),
  message: z.string().trim().nonempty('Message is required').default('')
})

const Contact: FC<Props> = ({ blok }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  })

  const submitHandler = (data: any) => {
    console.log(data)
  }

  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Contact"
      className="relative z-10 flex flex-col items-center w-full min-h-screen bg-brand-grey-light text-brand-dark p-4 xs:p-8 sm:p-16 xl:p-20"
    >
      <div className="w-full max-w-xl">
        <h1 className="text-3xl mb-5">Contact me</h1>

        <p className="text-lg text-brand-dark/50 mb-10 max-w-[40ch]">
          If you have a project in mind or would like to make an enquiry you can
          use the form below.
        </p>

        <FormBase className="w-full" onSubmit={handleSubmit(submitHandler)}>
          <FormField id="name" label="Name">
            <FormInput
              id="name"
              name="name"
              register={register}
              type="text"
              placeholder="Steve Jobs"
            />
            <FormError className="mt-2" error={errors.name} />
          </FormField>

          <FormField id="email" label="Email">
            <FormInput
              id="email"
              name="email"
              register={register}
              type="email"
              placeholder="sjobs@apple.com"
            />
            <FormError className="mt-2" error={errors.email} />
          </FormField>

          <FormField id="company" label="Company">
            <FormInput
              id="company"
              name="company"
              register={register}
              type="text"
              placeholder="Apple"
            />
            <FormError className="mt-2" error={errors.company} />
          </FormField>

          <FormField id="message" label="Message">
            <FormInput
              multiline
              id="message"
              name="message"
              register={register}
              placeholder="I just called to say I love you..."
            />
            <FormError className="mt-2" error={errors.message} />
          </FormField>

          <button type="submit" className="mt-5">
            <ButtonAppearance>{'Send message'}</ButtonAppearance>
          </button>
        </FormBase>
      </div>
    </section>
  )
}

export default Contact
