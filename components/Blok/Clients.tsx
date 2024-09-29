'use client'

import { FC, useEffect, useRef, useState, ElementRef } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { ClientsStoryblok, ClientStoryblok } from '@/types/storyblok'
import RichText from '@/components/RichText'
import SvgIcon from '@/components/SvgIcon'

interface Props {
  blok: ClientsStoryblok
}

const Clients: FC<Props> = ({ blok }) => {
  const itemsRef = useRef<Array<ElementRef<'li'> | null>>([])
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
      className="relative z-10 grid md:grid-cols-2 gap-16 xl:gap-20 w-full min-h-screen bg-brand-navy text-brand-light px-4 xs:px-8 sm:px-16 xl:px-20 py-16 xl:py-40"
    >
      <div>
        <div className="md:sticky md:top-16 xl:top-20 md:z-10">
          {blok.title && (
            <h1 className="text-lg mb-5 text-balance">{blok.title}</h1>
          )}

          {blok.text && (
            // max-lg:sr-only
            <RichText
              className="prose-custom max-w-[40ch] [&_h2]:text-brand-light [&_p]:text-brand-light/50"
              content={blok.text}
            />
          )}
        </div>
      </div>

      <div>
        <ul className="flex flex-col gap-1 text-5xl lg:text-6xl">
          {blok.clients &&
            blok.clients.map((client: ClientStoryblok, index: number) => (
              <li
                {...storyblokEditable(client)}
                key={client._uid}
                ref={el => (itemsRef.current[index] = el)}
                data-index={index}
                tabIndex={0}
                className={`relative outline-none ${
                  index === currentIndex ? 'z-10' : ''
                }`}
                onFocus={() => setIndex(index)}
              >
                <span className="flex overflow-hidden">
                  <span
                    className={`flex gap-5 transform-gpu transition-all duration-1000 ease-outCirc 
                  ${
                    index === currentIndex
                      ? 'translate-x-0'
                      : 'opacity-10 -translate-x-[80px]'
                  }
                `}
                  >
                    <span className="flex items-center flex-shrink-0">
                      <SvgIcon
                        name="arrow-right"
                        className="w-[60px] h-auto text-brand-light"
                      />
                    </span>

                    <span
                      onMouseEnter={() => setIndex(index)}
                      className="inline-block"
                    >
                      {client.title}
                    </span>
                  </span>
                </span>
              </li>
            ))}
        </ul>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <ul className="sticky top-0 bottom-0 w-screen h-screen">
          {blok.clients &&
            blok.clients.map((client: ClientStoryblok, index: number) => (
              <li
                key={client._uid}
                className="flex flex-col items-center justify-center lg:items-end absolute inset-0 p-4 xs:p-8 sm:p-16 xl:p-20"
              >
                <img
                  className={`transform-gpu transition-all duration-500 ease-outCirc rounded-2xl opacity-0 max-w-[70%] xs:max-w-[70%] sm:max-w-[70%] lg:max-w-[35%] ${
                    index === currentIndex
                      ? 'scale-100 opacity-100'
                      : 'scale-95'
                  }`}
                  src={`https://source.unsplash.com/500x500/?designstudio-${client.title}`}
                  alt=""
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}

export default Clients
