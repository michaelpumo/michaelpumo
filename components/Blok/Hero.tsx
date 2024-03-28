import { FC } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'
import Link from 'next/link'
import ButtonAppearance from '@/components/ButtonAppearance'
// import Navigation from '@/components/Navigation'
import PulseBeacon from '@/components/PulseBeacon'
import RichText from '@/components/RichText'
import type { HeroStoryblok } from '@/types/storyblok'

interface Props {
  blok: HeroStoryblok
}

const Hero: FC<Props> = ({ blok }) => (
  <section
    {...storyblokEditable(blok)}
    data-component="Hero"
    className="sticky top-0 z-10 w-full lg:h-screen lg:grid lg:grid-cols-2"
  >
    <div className="fixed top-0 z-10 w-full lg:static h-screen bg-brand-navy text-brand-light">
      <div className="flex flex-col items-start justify-between w-full h-full p-4 xs:p-8 sm:p-16 xl:p-20 overscroll-contain overflow-y-scroll">
        <header>
          {/* <Navigation /> */}
          <div className="flex items-center gap-3 text-sm border-none rounded-[50px] pl-5 pr-6 py-3 no-underline font-bold bg-brand-dark/20 text-brand-light">
            <PulseBeacon background="green">Available</PulseBeacon>
            Accepting new projects
          </div>
        </header>

        <div className="w-full my-10 flex flex-col gap-10">
          {blok.title && (
            <h1 className="max-w-[30ch] font-display text-3xl xs:text-4xl sm:text-5xl lg:text-5xl text-balance">
              {blok.title}
            </h1>
          )}

          {blok.description && (
            <RichText
              className="max-w-[50ch] text-md sm:text-lg text-balance [&>p]:text-brand-light/50"
              content={blok.description}
            />
          )}

          <p className="text-brand-yellow">
            <Link href="/" className="group">
              <ButtonAppearance>{"Let's work together"}</ButtonAppearance>
            </Link>
          </p>
        </div>

        <div>
          <p className="text-sm text-brand-light/50">
            Find me at{' '}
            <a
              className="text-brand-light hover:text-brand-red focus:text-brand-red transition-colors duration-300 ease-outQuad"
              target="_blank"
              rel="noopener"
              href="https://twitter.com/michaelpumo"
            >
              Twitter
            </a>
            ,{' '}
            <a
              className="text-brand-light hover:text-brand-red focus:text-brand-red transition-colors duration-300 ease-outQuad"
              target="_blank"
              rel="noopener"
              href="https://github.com/michaelpumo"
            >
              GitHub
            </a>{' '}
            and{' '}
            <a
              className="text-brand-light hover:text-brand-red focus:text-brand-red transition-colors duration-300 ease-outQuad"
              target="_blank"
              rel="noopener"
              href="https://www.linkedin.com/in/michaelpumo/"
            >
              LinkedIn
            </a>
            . <br />
            Download{' '}
            <a
              className="text-brand-light hover:text-brand-red focus:text-brand-red transition-colors duration-300 ease-outQuad"
              href="https://michaelpumo.cdn.prismic.io/michaelpumo/a40b9c43-29fd-421e-8484-6263a9d59584_michael-pumo-2024.pdf"
            >
              my resume
            </a>{' '}
            (PDF 893kb)
          </p>
        </div>
      </div>
    </div>

    <div className="mt-[100vh] lg:mt-0 sticky top-0 z-10 lg:relative h-screen bg-brand-grey-light">
      <Image
        className="absolute inset-0 z-10 w-full h-full object-cover"
        src="/images/profile.jpg"
        alt="Michael Pumo"
        sizes="50vw"
        width={1000}
        height={1000}
        priority
      />
    </div>
  </section>
)

export default Hero
