import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ButtonAppearance: FC<Props> = ({ children }) => {
  return (
    <span
      data-component="ButtonStyle"
      className="transition-colors duration-300 ease-outQuart text-lg border-2 rounded-full px-6 py-4 inline-block no-underline"
    >
      {children}
    </span>
  )
}

export default ButtonAppearance
