interface ImageUploaderProps {
  className?: string
  images: string[]
  onChange: (images: string[]) => void
}

export const ImageUploaderComp = (props: ImageUploaderProps) => {
  const { className, images, onChange } = props
  return (
    <div>
      <div>ImageUploader</div>
      <div>
        {images.map((image) => (
          <div key={image}>{image}</div>
        ))}
      </div>
    </div>
  )
}
