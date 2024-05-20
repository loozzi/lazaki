import { Button, Image } from '@nextui-org/react'
import { useState } from 'react'
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa'
import imageService from '~/services/image.service'

interface ImageUploaderProps {
  className?: string
  images: string[]
  onChange: (images: string[]) => void
}

export const ImageUploaderComp = (props: ImageUploaderProps) => {
  const { className, images, onChange } = props

  const [loading, setLoading] = useState<boolean>(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (!fileList) return
    setLoading(true)
    imageService.add(fileList[0]).then((res) => {
      if (res.status === 200) {
        onChange([...images, res.data.link])
        setLoading(false)
      } else {
        alert('Upload thất bại, vui lòng thử lại')
        setLoading(false)
      }
    })
  }

  return (
    <div className={className}>
      <div className='border-1 rounded-lg grid grid-cols-1 md:grid-cols-2'>
        <div className='p-4'>
          <div className='flex items-center justify-center w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <FaCloudUploadAlt color='#ccc' size={56} />
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Tải ảnh lên</span> hoặc kéo thả vào đây
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG</p>
              </div>
              <input id='dropzone-file' type='file' className='hidden' onChange={handleImageUpload} />
            </label>
          </div>
          {loading && <span>Đang tải ảnh lên...</span>}
        </div>
        <div className='flex flex-col gap-2 p-4'>
          {images.map((image) => (
            <div className='flex items-center gap-2'>
              <Image key={image} src={image} className='w-20' />
              <a className='w-full line-clamp-1' href={image} target='_blank'>
                {image}
              </a>
              <Button
                color='danger'
                variant='light'
                onClick={() => {
                  onChange(images.filter((img) => img !== image))
                }}
                isIconOnly
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
