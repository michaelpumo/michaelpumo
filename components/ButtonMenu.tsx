import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  children?: ReactNode
  className?: string
}

const ButtonMenu: FC<Props> = ({ children, className }) => (
  <div
    data-component="ButtonMenu"
    className={twMerge(['bg-brand-pink rounded-full p-0.5', className])}
  >
    <div className="flex items-center justify-center rounded-full w-14 h-14 text-2xl bg-brand-yellow">
      🍔
    </div>

    {children}
  </div>
)

export default ButtonMenu
