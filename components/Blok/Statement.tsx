import { FC, ElementRef, useRef, useEffect } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { brand } from '@/tailwind.config'
import type { StatementStoryblok } from '@/types/storyblok'

interface Props {
  blok: StatementStoryblok
}

const Statement: FC<Props> = ({ blok }) => {
  const container = useRef<ElementRef<'section'> | null>(null)
  const title = useRef<ElementRef<'h2'> | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!container.current || !title.current) return

    const scaleDown = 0.95

    gsap.set(title.current, { opacity: 0, scale: scaleDown })

    gsap
      .timeline({
        scrollTrigger: {
          markers: false,
          trigger: container.current,
          pin: true,
          scrub: 0.5,
          start: 'top top',
          end: `+=${window.innerHeight * 8}px`,
          id: 'item',
          invalidateOnRefresh: true
        }
      })
      .to(title.current, { opacity: 1, scale: 1, ease: 'none' })
      .add('A', '+=1')
      .to(title.current, { color: brand.light, ease: 'none' }, 'A')
      .to(container.current, { backgroundColor: brand.blue, ease: 'none' }, 'A')
      .add('B', '+=1')
      .to(
        title.current,
        { opacity: 0, scale: 1 / scaleDown, ease: 'none' },
        'B'
      )
      .to(container.current, { backgroundColor: brand.light, ease: 'none' })
  })

  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Statement"
      ref={container}
      className="relative z-10 w-full min-h-screen bg-brand-light text-brand-blue flex items-center justify-center px-4 sm:px-10 lg:px-14 xl:px-20"
    >
      <h2
        ref={title}
        className="font-display text-balance text-center text-3xl sm:text-7xl"
      >
        {/* Wonderful things happen when you work together. */}
        Tasty new web development portfolio. All in blue.
      </h2>
    </section>
  )
}

export default Statement
