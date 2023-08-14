import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ButtonAppearance: FC<Props> = ({ children }) => (
  <span
    data-component="ButtonAppearance"
    className="transition-colors duration-300 ease-outQuart text-lg border-2 border-black rounded-xl px-6 py-4 inline-block no-underline font-bold bg-black"
  >
    {children}
  </span>
)

export default ButtonAppearance
