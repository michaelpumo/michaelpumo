import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import type { AssetStoryblok } from '@/types/storyblok'

interface ImageOptions {
  width?: number
  quality?: number
  format?: string
}

export interface Props {
  image?: AssetStoryblok
  sizes?: number[]
  className?: string
  options?: ImageOptions
}

const ResponsiveImage: FC<Props> = ({ image, sizes, className, options }) => {
  if (!image || !sizes?.length) return null

  const mergedOptions: ImageOptions = {
    quality: 85,
    format: 'webp',
    ...options
  }

  const generateImageUrl = (
    filename: string,
    options: ImageOptions
  ): string => {
    // const queryParams = new URLSearchParams(options).toString()
    const file = filename.replace('//a.storyblok.com', '//a2.storyblok.com')
    return `${file}/m/${options.width}x0/filters:quality(${options.quality})`
  }

  // Take every size given but the first (because first is the default).
  // Sort them to be in order.
  const restSizes = sizes.slice(1).sort((a, b) => a - b)

  const srcAttr = generateImageUrl(image.filename, {
    ...mergedOptions,
    width: sizes[0]
  })

  const srcSetAttr = restSizes
    .map(
      size =>
        `${generateImageUrl(image.filename, {
          ...mergedOptions,
          width: size
        })} ${size}w`
    )
    .join(', ')

  const sizesAttr = restSizes
    .map(size => `(min-width: ${size}px) ${size}px`)
    .join(', ')

  return (
    <img
      className={twMerge('', className)}
      src={srcAttr}
      srcSet={srcSetAttr}
      sizes={sizesAttr}
      alt={image.alt}
    />
  )
}

export default ResponsiveImage
