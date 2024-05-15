import { ImageLoaderProps } from 'next/image'

export interface CloudFrontImageProps {
  query?: TAwsQueryProps
}

interface TAwsQueryProps {
  format?: 'webp' | 'jpg' | 'png' | 'avif' | 'jpeg'
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
}

type TAwsImgQueryProps = ImageLoaderProps & TAwsQueryProps

export const awsImgQuery = ({
  src,
  width,
  quality,
  format,
  fit,
}: TAwsImgQueryProps) => {
  let query = `${src}?w=${width}&q=${quality || 80}`
  if (format) {
    query += `&f=${format}`
  } else {
    query += `&f=webp`
  }
  if (fit) {
    query += `&fit=${fit}`
  }
  return query
}
