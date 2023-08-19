import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface Props {
  children?: ReactNode
  className?: string
}

const ButtonMenu: FC<Props> = ({ children, className }) => (
  <div
    data-component="ButtonMenu"
    className={twMerge(['bg-brand-pink rounded-full p-4', className])}
  >
    <Image
      className=""
      src="/images/burger.png"
      alt="Menu"
      width={30}
      height={30}
      priority
    />

    {children}
  </div>
)

export default ButtonMenu
