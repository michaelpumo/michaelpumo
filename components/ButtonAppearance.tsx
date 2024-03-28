import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { brand } from '@/tailwind.config'

interface Props {
  children: ReactNode
  className?: string
  color?: keyof typeof brand
  background?: keyof typeof brand
}

const ButtonAppearance: FC<Props> = ({
  children,
  className,
  color = 'navy',
  background = 'red'
}) => {
  const colorClass = brand[color] ? `text-brand-${color}` : 'text-brand-navy'
  const backgroundClass = brand[background]
    ? `bg-brand-${background} outline-brand-${background} group-hover:outline-brand-${background} group-focus:outline-brand-${background}`
    : 'bg-brand-red outline-brand-red group-hover:outline-brand-red group-focus:outline-brand-red'

  return (
    <span
      data-component="ButtonAppearance"
      className={twMerge([
        'transition-all duration-300 ease-natural text-lg border-none rounded-[50px] px-6 py-4 inline-block no-underline font-bold -outline-offset-1 outline outline-1 group-hover:outline-offset-2 group-focus:outline-offset-2',
        colorClass,
        backgroundClass,
        className
      ])}
    >
      {children}
    </span>
  )
}

export default ButtonAppearance
