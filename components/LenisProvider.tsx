'use client'

import { FC, ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

interface Props {
  children: ReactNode
}

const LenisProvider: FC<Props> = ({ children }) => {
  useEffect(() => {
    // const lenis = new Lenis()

    // lenis.on('scroll', ScrollTrigger.update)

    // gsap.ticker.add((time)=>{
    //   lenis.raf(time * 1000)
    // })

    // gsap.ticker.lagSmoothing(0)

    const lenis = new Lenis({
      // lerp: 0.1
      duration: 1.5
    })

    lenis.on('scroll', (e: Event) => {
      console.log(e)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => {
      // lenis.off('scroll')
      console.log('done')
    }
  }, [])

  return children
}

export default LenisProvider
