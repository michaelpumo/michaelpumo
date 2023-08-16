import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  label: string
  id?: string | undefined
  children?: ReactNode
  className?: string
}

const FormField: FC<Props> = ({ label, id, children, className, ...rest }) => (
  <div
    data-component="FormField"
    className={twMerge('w-full mb-5', className)}
    {...rest}
  >
    {label && (
      <label
        className="text-brand-dark mb-2 inline-block w-auto text-md font-bold"
        htmlFor={id}
      >
        {label}
      </label>
    )}

    {children}
  </div>
)

export default FormField
