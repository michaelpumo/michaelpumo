import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { brand } from '@/tailwind.config'

interface Props {
  children?: ReactNode
  className?: string
  background?: keyof typeof brand
}

const PulseBeacon: FC<Props> = ({
  children,
  className,
  background = 'red'
}) => {
  const backgroundClass = brand[background]
    ? `bg-brand-${background}`
    : 'bg-brand-red'
  const outlineClass = brand[background]
    ? `outline-brand-${background}`
    : 'outline-brand-red'

  return (
    <span
      data-component="PulseBeacon"
      className={twMerge([
        'relative animate-pulse w-3 h-3 transition-all duration-300 ease-outQuad text-lg border-none rounded-full inline-block',
        backgroundClass,
        className
      ])}
    >
      <span
        className={twMerge([
          'absolute inset-0 animate-ring rounded-full outline outline-1 outline-offset-2 opacity-0 transform-gpu',
          outlineClass
        ])}
      ></span>
      <span className="sr-only">{children}</span>
    </span>
  )
}

export default PulseBeacon
