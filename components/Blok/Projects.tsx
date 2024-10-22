'use client'

import { FC, useRef, ElementRef, memo, useMemo } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ResponsiveImage from '@/components/ResponsiveImage'
import StoryblokLink from '@/components/StoryblokLink'
import { type ProjectsStoryblok } from '@/types/storyblok'
import { type Props as ImageProps } from '@/components/ResponsiveImage'

interface Props {
  blok: ProjectsStoryblok
}

const MemoizedResponsiveImage: FC<ImageProps> = memo(
  ({ className, image, sizes, options }) => {
    return (
      <ResponsiveImage
        className={className}
        image={image}
        sizes={sizes}
        options={options}
      />
    )
  }
)

const Projects: FC<Props> = ({ blok }) => {
  const container = useRef<ElementRef<'section'> | null>(null)
  const list = useRef<ElementRef<'ul'> | null>(null)
  const itemsRef = useRef<Array<ElementRef<'li'> | null>>([])
  const projects = useMemo(
    () => blok.projects?.filter(project => project?.image) ?? [],
    [blok.projects]
  )

  useGSAP(
    () => {
      if (!container.current || !list.current) return () => {}

      gsap.registerPlugin(useGSAP)
      gsap.registerPlugin(ScrollTrigger)

      const scrollTween = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            scrub: true,
            end: `+=${list.current.scrollWidth}`,
            invalidateOnRefresh: true,
            markers: false
          }
        })
        .to(list.current, {
          // x: -list.current.scrollWidth,
          xPercent: -100
        })

      itemsRef.current?.forEach((item, index) => {
        const inner = item?.firstElementChild

        if (!item || !inner) return

        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              scrub: true,
              id: 'item',
              invalidateOnRefresh: true,
              pinnedContainer: container.current,
              containerAnimation: scrollTween,
              start: 'center 80%',
              end: 'center 20%',
              markers: false
            }
          })
          .from(inner, { opacity: 0.5 })
      })
    },
    { scope: container }
  )

  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Projects"
      ref={container}
      className="w-full bg-brand-light text-brand-dark"
    >
      <ul
        ref={list}
        className="w-max min-h-screen flex flex-nowrap whitespace-nowrap gap-0 p-0 bg-yellow-300"
      >
        {projects?.map((project, index) => (
          <li
            {...storyblokEditable(project)}
            key={project._uid}
            ref={el => (itemsRef.current[index] = el)}
            tabIndex={0}
            className="pointer-events-none w-full h-auto max-w-[calc(100vw-80px)] xs:max-w-[420px] flex-shrink-0"
          >
            <StoryblokLink
              link={project.link}
              className="grid grid-cols-1 items-center justify-start w-full h-full hover:no-underline"
            >
              <MemoizedResponsiveImage
                className="col-span-full row-span-full w-full h-auto object-cover rounded-2xl aspect-[3/4]"
                image={project.image}
                sizes={[800, 1200, 1600]}
              />

              <p className="col-span-full row-span-full transition-all duration-200 w-full px-4 pointer-events-none select-none font-display font-bold text-balance text-center text-brand-light text-project-title">
                {project.title}
              </p>
            </StoryblokLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects
