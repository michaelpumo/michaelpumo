import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  children?: ReactNode
  className?: string
  [key: string]: any
}

const FormBase: FC<Props> = ({ children, className, ...rest }) => (
  <form
    data-component="FormBase"
    className={twMerge('w-full', className)}
    {...rest}
  >
    {children}
  </form>
)

export default FormBase
