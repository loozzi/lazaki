import { Button, Image } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { ImageResponse } from '~/models/product'

interface ItemImageControllerProps {
  images: ImageResponse[]
  variationImage?: string
}

export const ItemImageControllerComp = (props: ItemImageControllerProps) => {
  const { images, variationImage } = props

  const [currentImage, setCurrentImage] = useState(images.filter((image) => image.isPrimary)[0])

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)

  const handlePrev = () => {
    if (start > 0) {
      setStart(start - 1)
      setEnd(end - 1)
    }
  }
  const handleNext = () => {
    if (end < images.length) {
      setStart(start + 1)
      setEnd(end + 1)
    }
  }

  const getSlicedImages = images.slice(start, end)

  useEffect(() => {
    if (variationImage) setCurrentImage(images.filter((image) => image.link === variationImage)[0] || images[0])
  }, [variationImage])

  useEffect(() => {
    setCurrentImage(images.filter((image) => image.isPrimary)[0])
  }, [images])

  return (
    <div className={'lg:max-w-[450px] w-full mx-2 md:mx-0'}>
      <div className='flex justify-center'>
        <Image
          src={currentImage.link}
          alt={'Hình ảnh sản phẩm'}
          className=' w-[450px] h-[450px] max-w-[450px] aspect-square max-h-[450px] object-contain'
        />
      </div>
      <div className='flex mt-2 justify-start relative'>
        <Button
          isIconOnly
          color='success'
          variant={start <= 0 ? 'flat' : 'shadow'}
          onClick={handlePrev}
          className='absolute top-6 left-0 z-50'
          size='sm'
          disabled={start <= 0}
        >
          <FaChevronLeft color='#fff' />
        </Button>
        <div className='flex flex-wrap gap-4'>
          {getSlicedImages.map((image, index) => {
            return (
              <div key={index} onClick={() => setCurrentImage(image)}>
                <Image
                  src={image.link}
                  alt={'Hình ảnh sản phẩm'}
                  className='cursor-pointer w-[76px] h-[76px] object-cover'
                />
              </div>
            )
          })}
        </div>
        <Button
          isIconOnly
          variant={end >= images.length ? 'flat' : 'shadow'}
          color='success'
          onClick={handleNext}
          className='absolute top-6 right-0 z-50'
          size='sm'
          disabled={end >= images.length}
        >
          <FaChevronRight color='#fff' />
        </Button>
      </div>
    </div>
  )
}
