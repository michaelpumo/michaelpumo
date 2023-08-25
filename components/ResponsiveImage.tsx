import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  image: any
  customSizes: number[]
  className?: string
}

const ResponsiveImage: FC<Props> = ({ image, customSizes, className }) => {
  const baseUrl = image.filename
  // .replace('//a.storyblok.com', '//a2.storyblok.com')
  const options = {
    width: 800,
    quality: 85,
    format: 'webp'
  }

  const generateImageUrl = (filename: string, options) => {
    // const queryParams = new URLSearchParams(options).toString()
    return `${filename}/m/${options.width}x0/filters:quality(${options.quality})`
  }

  const srcSet = customSizes
    .map(
      size =>
        `${generateImageUrl(image.filename, {
          ...options,
          width: size
        })} ${size}w`
    )
    .join(', ')

  console.log(srcSet)

  const sizes = customSizes
    .map((size, index) => `(min-width: ${size}px) ${size}px`)
    .join(', ')

  return (
    <img
      className={twMerge('', className)}
      src={generateImageUrl(image.filename, options)}
      srcSet={srcSet}
      sizes={sizes}
      alt={image.alt}
      title={image.title}
    />
  )
}

export default ResponsiveImage
