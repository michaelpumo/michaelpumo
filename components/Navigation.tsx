import { FC, ElementRef, useRef, useState, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

const Navigation: FC<Props> = ({ className }) => {
  const list = useRef<ElementRef<'ul'>>(null)
  const [open, setOpen] = useState(false)

  const navigationStyles = useMemo(() => {
    if (!list.current) {
      return { width: 0 }
    }

    const { width } = list.current.getBoundingClientRect()

    return open ? { width: `${width}px` } : { width: 0 }
  }, [open, list])

  const toggle = () => {
    setOpen(!open)
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
          } absolute top-0 left-0 z-0 pointer-events-none rounded-full w-full h-full border-2 bg-brand-navy border-brand-light transition-all duration-300 ease-inOutCubic`}
        />
        <span className="relative z-10 text-2xl">🍔</span>
        <span className="sr-only">Menu</span>
      </button>

      <nav
        style={navigationStyles}
        className="w-0 h-full overflow-hidden transition-all duration-300 ease-inOutCubic"
      >
        <ul
          ref={list}
          className={`${
            open ? 'opacity-100' : 'opacity-0'
          } flex items-start justify-start gap-4 pl-4 pr-6 w-fit h-full transition-opacity duration-300`}
        >
          <li className="text-sm">
            <a className="no-underline" href="#">
              About
            </a>
          </li>
          <li className="text-sm">
            <a className="no-underline" href="#">
              Clients
            </a>
          </li>
          <li className="text-sm">
            <a className="no-underline" href="#">
              Projects
            </a>
          </li>
          <li className="text-sm">
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
