'use client'

import { FC, useEffect, useRef, useState, ElementRef } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { ClientsStoryblok } from '@/types/storyblok'
import RichText from '@/components/RichText'

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
      className="relative z-10 grid md:grid-cols-2 gap-16 xl:gap-20 w-full min-h-screen bg-brand-grey-light text-brand-dark px-4 xs:px-8 sm:px-16 xl:px-20
      
      py-16 xl:py-20"
    >
      <div>
        <div className="md:sticky md:top-16 xl:top-20 md:z-10">
          {blok.title && (
            <h1 className="text-lg mb-5 text-balance">{blok.title}</h1>
          )}

          {blok.text && (
            <RichText
              className="prose-custom max-w-[40ch]"
              content={blok.text}
            />
          )}
        </div>
      </div>

      <div>
        {/* <img src="https://source.unsplash.com/200x200/?designstudio" alt="" /> */}

        <ul className="flex flex-col gap-1 text-5xl lg:text-6xl">
          {blok.clients &&
            blok.clients.map((client: any, index: number) => (
              <li
                {...storyblokEditable(client)}
                key={client._uid}
                ref={el => (itemsRef.current[index] = el)}
                data-index={index}
                tabIndex={0}
                className={`transform-gpu transition-all duration-1000 ease-outCirc outline-none ${
                  index === currentIndex
                    ? 'translate-x-6 lg:translate-x-10'
                    : '' // opacity-10'
                }`}
                onFocus={() => setIndex(index)}
              >
                <span
                  onMouseEnter={() => setIndex(index)}
                  className="inline-block"
                >
                  {client.title}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}

export default Clients
