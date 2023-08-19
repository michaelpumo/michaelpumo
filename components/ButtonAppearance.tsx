import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  children: ReactNode
  className?: string
}

const ButtonAppearance: FC<Props> = ({ children, className }) => (
  <span
    data-component="ButtonAppearance"
    className={twMerge([
      'transition-colors duration-300 ease-outQuart text-lg border-2 border-brand-dark rounded-xl px-6 py-4 inline-block no-underline font-bold bg-brand-dark text-brand-light',
      className
    ])}
  >
    {children}
  </span>
)

export default ButtonAppearance
