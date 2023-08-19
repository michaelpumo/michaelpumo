'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { ClientsStoryblok } from '@/types/storyblok'

interface Props {
  blok: ClientsStoryblok
}

const Clients: FC<Props> = ({ blok }) => {
  const itemsRef = useRef<Array<HTMLLIElement | null>>([])
  const [currentIndex, setIndex] = useState(0)

  const callback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const value = (entry.target as HTMLElement).dataset.index

      if (entry.isIntersecting && value) {
        setIndex(parseInt(value, 10))
      }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      rootMargin: '-50% 0% -50% 0%',
      threshold: 0
    })

    itemsRef.current?.forEach(item => item && observer.observe(item))

    return () => {
      itemsRef.current?.forEach(item => item && observer?.unobserve(item))
      observer.disconnect()
    }
  }, [blok.clients])

  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Clients"
      className="relative z-10 grid grid-cols-2 gap-4 xs:gap-8 sm:gap-16 xl:gap-20 w-full min-h-screen bg-brand-grey-light text-brand-dark p-4 xs:p-8 sm:p-16 xl:p-20"
    >
      <div>
        <div className="sticky top-4 xs:top-8 sm:top-16 xl:top-20 z-10">
          <h1 className="text-3xl mb-5">Clients</h1>

          <p className="text-2xl text-brand-dark mb-5 text-balance max-w-[40ch]">
            I'm proud to have worked with some fantastic companies over the
            course of my web development career.
          </p>

          <p className="text-lg text-brand-dark/50 mb-10 max-w-[40ch]">
            From content-managed static sites with a headless CMS to eCommerce
            shopping experiences.
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-1 text-6xl">
        {blok.clients &&
          blok.clients.map((client: any, index: number) => (
            <li
              {...storyblokEditable(client)}
              key={index}
              ref={el => (itemsRef.current[index] = el)}
              data-index={index}
              tabIndex={0}
              onMouseEnter={() => setIndex(index)}
              className={`transition-all duration-500 ease-outExpo ${
                index === currentIndex ? 'translate-x-8 lg:translate-x-10' : '' // opacity-10'
              }`}
            >
              {client.title}
            </li>
          ))}
      </ul>
    </section>
  )
}

export default Clients
