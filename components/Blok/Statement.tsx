import { FC, ElementRef, useRef } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { brand } from '@/tailwind.config'
import type { StatementStoryblok } from '@/types/storyblok'

interface Props {
  blok: StatementStoryblok
}

const Statement: FC<Props> = ({ blok }) => {
  gsap.registerPlugin(useGSAP)

  const container = useRef<ElementRef<'section'> | null>(null)
  const title = useRef<ElementRef<'h2'> | null>(null)

  useGSAP(
    () => {
      if (!container.current || !title.current) return

      const scaleDown = 0.95

      gsap.registerPlugin(ScrollTrigger)
      gsap.set(title.current, { opacity: 0, scale: scaleDown })

      gsap
        .timeline({
          scrollTrigger: {
            markers: false,
            trigger: container.current,
            pin: true,
            anticipatePin: 1,
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
        .to(
          container.current,
          { backgroundColor: brand.navy, ease: 'none' },
          'A'
        )
        .add('B', '+=1')
        .to(
          title.current,
          { opacity: 0, scale: 1 / scaleDown, ease: 'none' },
          'B'
        )
      // .to(container.current, {
      //   backgroundColor: brand.navy,
      //   ease: 'none'
      // })
    },
    { scope: container }
  )

  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Statement"
      ref={container}
      className="relative z-10 w-full min-h-screen bg-brand-light text-brand-navy flex items-center justify-center px-4 sm:px-10 lg:px-14 xl:px-20"
    >
      <h2
        ref={title}
        className="font-display text-balance text-center text-3xl sm:text-7xl"
      >
        {/* text-gradient  */}
        Building the best of the web with the best tools.
      </h2>
    </section>
  )
}

export default Statement
