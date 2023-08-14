'use server'

import { FC, ReactNode } from 'react'
import Image from 'next/image'

interface Props {
  children?: ReactNode
}

const ButtonMenu: FC<Props> = ({ children }) => (
  <div data-component="ButtonMenu" className="bg-white rounded-full p-4">
    <Image
      className=""
      src="/images/burger.png"
      alt="Menu"
      width={30}
      height={30}
      priority
    />
  </div>
)

export default ButtonMenu
