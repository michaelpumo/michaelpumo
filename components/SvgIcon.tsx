import { FC, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import ArrowRight from '@/../public/images/arrow-right.svg'

type Icons = 'arrow-right'

const icons: Record<Icons, ElementType> = {
  'arrow-right': ArrowRight
}

type Props = {
  className?: string
  name: Icons
}

const SvgIcon: FC<Props> = ({ className, name, ...rest }) => {
  const Icon = icons[name]

  return Icon ? (
    <Icon className={twMerge(['inline-block', className])} {...rest}></Icon>
  ) : null
}

export default SvgIcon
