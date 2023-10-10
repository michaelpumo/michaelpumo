import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import type { MultilinkStoryblok } from '@/types/storyblok'

interface Props {
  link?: MultilinkStoryblok
  children?: ReactNode
  className?: string
}

const StoryblokLink: FC<Props> = ({ link, children, className }) => {
  const href =
    link?.linktype === 'email'
      ? `mailto:${link?.email}`
      : link?.linktype === 'story'
      ? `/${link?.cached_url?.replace('home', '')}`
      : link?.cached_url

  const customAttributes = {
    class: link?.class,
    title: link?.title,
    rel: link?.rel
  }

  const attributes = {
    ...customAttributes,
    className: twMerge('', link?.class, className),
    href: href?.trim(),
    target: link?.target ?? link?.linktype === 'asset' ? '_blank' : undefined
  }

  delete attributes['class']

  return (
    <Link data-component="StoryblokLink" {...attributes}>
      {children}
    </Link>
  )
}

export default StoryblokLink
