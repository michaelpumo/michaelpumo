'use client'

import { FC, useRef, ElementRef, useEffect, useState } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { ProjectsStoryblok } from '@/types/storyblok'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  blok: ProjectsStoryblok
}

const Projects: FC<Props> = ({ blok }) => {
  const [title, setTitle] = useState('dfdb')
  const container = useRef<ElementRef<'div'> | null>(null)
  const list = useRef<ElementRef<'ul'> | null>(null)
  const itemsRef = useRef<Array<ElementRef<'li'> | null>>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!container.current || !list.current) return

    const scrollTween = gsap.to(list.current, {
      x: -list.current?.scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 0.1,
        end: `+=${list.current?.scrollWidth}`
        //snap: directionalSnap(1 / (sections.length - 1)),
      }
    })

    itemsRef.current?.forEach(item => {
      const inner = item?.firstElementChild!
      gsap.set(inner, { scale: 0.75, transformOrigin: 'center center' })

      ScrollTrigger.create({
        markers: true,
        trigger: item,
        containerAnimation: scrollTween,
        start: 'center 90%',
        end: 'center 10%',
        scrub: true,
        id: 'item',
        onEnter: () => {
          console.log(
            'onEnter',
            blok.projects[parseInt(item?.dataset.index!, 10)].title
          )
          // setTitle(blok.projects[parseInt(item?.dataset.index!, 10)].title)
        },
        onEnterBack: () => {
          console.log(
            'onEnterBack',
            blok.projects[parseInt(item?.dataset.index!, 10)].title
          )
        },
        onLeave: () => {
          console.log(
            'onLeave',
            blok.projects[parseInt(item?.dataset.index!, 10)].title
          )
        },
        onLeaveBack: () => {
          console.log(
            'onLeaveBack',
            blok.projects[parseInt(item?.dataset.index!, 10)].title
          )
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
            id: 'item'
            // onEnter: () => {
            //   console.log(
            //     'onEnter',
            //     blok.projects[parseInt(item?.dataset.index!, 10)].title
            //   )
            //   // setTitle(blok.projects[parseInt(item?.dataset.index!, 10)].title)
            // },
            // onEnterBack: () => {
            //   console.log(
            //     'onEnterBack',
            //     blok.projects[parseInt(item?.dataset.index!, 10)].title
            //   )
            // },
            // onLeave: () => {
            //   console.log(
            //     'onLeave',
            //     blok.projects[parseInt(item?.dataset.index!, 10)].title
            //   )
            // },
            // onLeaveBack: () => {
            //   console.log(
            //     'onLeaveBack',
            //     blok.projects[parseInt(item?.dataset.index!, 10)].title
            //   )
            //   // setTitle(blok.projects[parseInt(item?.dataset.index!, 10)].title)
            // }
          }
        })
        .to(inner, { scale: 1, ease: 'none' })
        .to(inner, { scale: 0.75, ease: 'none' }) // , '+=2'
    })

    return () => {}
  }, []) // container, list, itemsRef

  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Projects"
      ref={container}
      className="relative z-10 w-full min-h-screen bg-brand-light text-brand-dark flex items-center justify-center"
    >
      <p className="absolute top-1/2 z-10 -translate-y-1/2 pointer-events-none select-none font-display font-bold text-balance text-center text-brand-blue text-[20vh]">
        {title}
      </p>

      {/* snap-x snap-mandatory scroll-smooth overflow-auto  */}
      <div className="wrap w-full overflow-x-hidden">
        <ul
          ref={list}
          className="w-auto h-[calc(100vh_-_300px)] flex flex-nowrap gap-10 scroll-px-[calc(50vw_-_(100vh_-_300px)_/_2.75)] px-[calc(50vw_-_(100vh_-_300px)_/_2.75)]"
        >
          {blok.projects &&
            blok.projects.map((project: any, index: number) => (
              <li
                key={index}
                ref={el => (itemsRef.current[index] = el)}
                data-index={index}
                tabIndex={0}
                className="w-auto h-full rounded-2xl aspect-[3/4]"
              >
                <div className="relative w-full h-full">
                  {/* first:scale-100 scale-75 snap-start */}
                  <img
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    src="https://images.prismic.io/michaelpumo/2cda8e7c-be5a-45a2-9e34-0b2730fe1dae_project-moth.jpg?auto=compress,format"
                    alt={project.title}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}

export default Projects
