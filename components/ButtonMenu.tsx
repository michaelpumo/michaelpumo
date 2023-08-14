'use server'

import { FC, ReactNode } from 'react'
import Image from 'next/image'

interface Props {
  children?: ReactNode
}

const ButtonMenu: FC<Props> = ({ children }) => {
  return (
    <div
      data-component="ButtonMenu"
      className="fixed top-5 left-5 z-10 bg-white rounded-full p-4"
    >
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
}

export default ButtonMenu
