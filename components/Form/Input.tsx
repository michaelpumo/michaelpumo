import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  name: string
  multiline?: boolean
  register: UseFormReturn['register']
  className?: string
  [key: string]: any
}

const FormInput: FC<Props> = ({
  name,
  multiline,
  register,
  className,
  ...rest
}) => (
  <>
    {multiline ? (
      <textarea
        data-component="FormInput"
        autoComplete="off"
        spellCheck="false"
        className={twMerge(
          'focus:ring-0 focus:outline focus:outline-offset-0 focus:outline-2 focus:outline-brand-blue border-none bg-brand-light text-brand-dark block w-full rounded px-6 py-4 min-h-[180px]',
          className
        )}
        {...register(name)}
        {...rest}
      />
    ) : (
      <input
        data-component="FormInput"
        autoComplete="off"
        spellCheck="false"
        className={twMerge(
          'focus:ring-0 focus:outline focus:outline-offset-0 focus:outline-2 focus:outline-brand-blue border-none bg-brand-light text-brand-dark block w-full rounded px-6 py-4',
          className
        )}
        {...register(name)}
        {...rest}
      />
    )}
  </>
)

export default FormInput
