'use client'

import {
  FC,
  useRef,
  ElementRef,
  useEffect,
  useState,
  memo,
  useMemo
} from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { ProjectsStoryblok, ProjectStoryblok } from '@/types/storyblok'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ResponsiveImage from '@/components/ResponsiveImage'
import type { Props as ImageProps } from '@/components/ResponsiveImage'

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
  const [title, setTitle] = useState('')
  const container = useRef<ElementRef<'section'> | null>(null)
  const list = useRef<ElementRef<'ul'> | null>(null)
  const itemsRef = useRef<Array<ElementRef<'li'> | null>>([])
  const projects = useMemo(
    () =>
      blok.projects?.filter((project: ProjectStoryblok) => project?.image) ??
      [],
    [blok.projects]
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!container.current || !list.current) return

    const initialTitle = projects?.[0].title
    initialTitle && setTitle(initialTitle)

    const scrollTween = gsap.to(list.current, {
      x: -list.current?.scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 0.5,
        end: `+=${list.current?.scrollWidth}`,
        invalidateOnRefresh: true
      }
    })

    itemsRef.current?.forEach((item, index) => {
      const inner = item?.firstElementChild
      const title = blok.projects?.[index].title

      if (!item || !inner) return

      gsap.set(inner, { scale: 0.75, transformOrigin: 'center center' })

      ScrollTrigger.create({
        markers: false,
        trigger: item,
        containerAnimation: scrollTween,
        start: 'left center',
        end: 'right center',
        scrub: true,
        id: `${title}`,
        invalidateOnRefresh: true,
        onEnter: () => {
          title && setTitle(title)
        },
        onEnterBack: () => {
          title && setTitle(title)
        }
      })

      gsap
        .timeline({
          scrollTrigger: {
            markers: false,
            trigger: item,
            containerAnimation: scrollTween,
            start: 'center 90%',
            end: 'center 10%',
            scrub: true,
            id: 'item',
            invalidateOnRefresh: true
          }
        })
        .to(inner, { scale: 1, ease: 'none' })
        .to(inner, { scale: 0.75, ease: 'none' })
    })

    return () => {}
  }, [])

  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Projects"
      ref={container}
      className="relative z-10 w-full min-h-screen bg-brand-light text-brand-dark flex items-center justify-center"
    >
      <p className="absolute z-10 w-full px-4 pointer-events-none select-none font-display font-bold text-balance text-center text-brand-blue text-project-title">
        {title}
      </p>

      <div className="wrap w-full overflow-x-hidden">
        <ul
          ref={list}
          className="w-auto h-[calc(100vh_-_170px)] flex flex-nowrap gap-10 scroll-px-[calc(50vw_-_(100vh_-_170px)_/_2.75)] px-[calc(50vw_-_(100vh_-_170px)_/_2.75)]"
        >
          {projects?.map((project: ProjectStoryblok, index: number) => (
            <li
              {...storyblokEditable(project)}
              key={project._uid}
              ref={el => (itemsRef.current[index] = el)}
              tabIndex={0}
              className="w-auto h-full rounded-2xl aspect-[3/4]"
            >
              <div className="relative w-full h-full">
                <MemoizedResponsiveImage
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  image={project.image}
                  sizes={[800, 1200, 1600]}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="absolute bottom-9 z-10 w-full px-4 font-bold text-center text-sm text-brand-blue">
        <a href="#" className="no-underline">
          Skip Projects
        </a>
      </p>
    </section>
  )
}

export default Projects
