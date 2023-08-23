import { FC, ElementRef, useRef, useState } from 'react'
import { set } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

const Navigation: FC<Props> = ({ className }) => {
  const nav = useRef<ElementRef<'nav'>>(null)
  const list = useRef<ElementRef<'ul'>>(null)
  const [open, setOpen] = useState(false)

  const toggle = () => {
    console.log('click')
    if (nav.current && list.current) {
      if (open) {
        nav.current.style.width = `0px`
        setOpen(false)
      } else {
        const { width, height } = list.current.getBoundingClientRect()

        console.log('width', width, height)
        console.log('offset', list.current.offsetWidth)

        nav.current.style.width = `${width}px`
        setOpen(true)
      }
    }
  }

  return (
    <div
      data-component="Navigation"
      className={twMerge([
        'flex items-center justify-start bg-brand-light text-brand-dark rounded-full',
        className
      ])}
    >
      <button
        type="button"
        aria-expanded={open}
        className={`relative flex items-center justify-center rounded-full w-14 h-14 border-2 border-brand-light`}
        onClick={() => toggle()}
      >
        <span
          className={`${
            open ? 'scale-100' : 'scale-0'
          } absolute top-0 left-0 z-0 pointer-events-none rounded-full w-full h-full border-2 bg-brand-blue border-brand-light transition-all duration-300 ease-inOutCubic`}
        />
        <span className="relative z-10 text-2xl">🍔</span>
      </button>

      <nav
        ref={nav}
        className="w-0 h-full overflow-hidden transition-all duration-300 ease-outExpo"
      >
        <ul
          ref={list}
          className="flex items-start justify-start gap-4 h-full bg-brand-red"
        >
          <li>
            <a className="no-underline" href="#">
              About
            </a>
          </li>
          <li>
            <a className="no-underline" href="#">
              Clients
            </a>
          </li>
          <li>
            <a className="no-underline" href="#">
              Projects
            </a>
          </li>
          <li>
            <a className="no-underline" href="#">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
