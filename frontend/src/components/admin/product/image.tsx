import { ImageResponse } from '~/models/product'

interface AdminProductImageProps {
  className?: string
  images: ImageResponse[]
}

export const AdminProductImageComp = (props: AdminProductImageProps) => {
  const { className, images } = props

  return <div className={className}></div>
}
