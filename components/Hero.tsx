import { FC } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'
import Link from 'next/link'
import ButtonAppearance from '@/components/ButtonAppearance'
import RichText from '@/components/RichText'

interface Hero {
  title?: string
  description?: string
}

interface Props {
  blok: any
}

const Hero: FC<Props> = ({ blok }) => {
  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Hero"
      className="sticky top-0 -z-10 w-full min-h-screen grid grid-cols-2"
    >
      <div className="p-4 sm:p-10 lg:p-14 xl:p-20 bg-brand-blue text-white">
        <h1 className="font-display text-5xl text-balance mb-10">
          {blok.title}
        </h1>

        <RichText className="text-xl mb-10" content={blok.description} />

        <p>
          <Link href="/">
            <ButtonAppearance>{"Let's work together"}</ButtonAppearance>
          </Link>
        </p>
      </div>

      <div className="bg-slate-100">
        <Image
          className="w-full h-full object-cover"
          src="/images/me.jpeg"
          alt="Michael Pumo"
          sizes="50vw"
          width={1000}
          height={1000}
          priority
        />
      </div>
    </section>
  )
}

export default Hero
