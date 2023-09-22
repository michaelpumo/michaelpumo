'use client'

import { FC, ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

interface Props {
  children: ReactNode
}

const LenisProvider: FC<Props> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true
    })

    // lenis.on('scroll', ({ ...all }) => {
    //   console.log(all)
    // })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      console.log('Destroy Lenis')
      lenis.destroy()
    }
  }, [])

  return children
}

export default LenisProvider
