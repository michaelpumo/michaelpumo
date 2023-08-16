import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

interface Props {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  className?: string
}

const FormError: FC<Props> = ({ error, className }) => (
  <>
    {error?.message && (
      <p
        data-component="FormError"
        className={twMerge('text-brand-red text-sm', className)}
      >
        {error.message.toString()}
      </p>
    )}
  </>
)

export default FormError
