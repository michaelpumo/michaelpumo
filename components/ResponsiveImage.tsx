import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import type { AssetStoryblok } from '@/types/storyblok'

interface Props {
  image?: AssetStoryblok
  customSizes?: number[]
  className?: string
}

interface ImageOptions {
  width: number
  quality: number
  format: string
}

const ResponsiveImage: FC<Props> = ({ image, customSizes = [], className }) => {
  if (!image) return null

  const options: ImageOptions = {
    width: 800,
    quality: 85,
    format: 'webp'
  }

  const generateImageUrl = (filename: string, options: ImageOptions) => {
    // const queryParams = new URLSearchParams(options).toString()
    const file = filename.replace('//a.storyblok.com', '//a2.storyblok.com')
    return `${file}/m/${options.width}x0/filters:quality(${options.quality})`
  }

  const sizes = customSizes.slice(1).sort((a, b) => a - b)

  const srcSetAttr = sizes
    .map(
      size =>
        `${generateImageUrl(image.filename, {
          ...options,
          width: size
        })} ${size}w`
    )
    .join(', ')

  const sizesAttr = sizes
    .map(size => `(min-width: ${size}px) ${size}px`)
    .join(', ')

  return (
    <img
      className={twMerge('', className)}
      src={generateImageUrl(image.filename, options)}
      srcSet={srcSetAttr}
      sizes={sizesAttr}
      alt={image.alt}
    />
  )
}

export default ResponsiveImage
