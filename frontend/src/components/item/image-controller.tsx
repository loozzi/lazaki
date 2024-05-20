import { Image } from '@nextui-org/react'
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

  return (
    <div className={'md:max-w-[450px] w-full mx-2 md:mx-0'}>
      <div className='flex justify-center'>
        <Image
          src={currentImage.link}
          alt={'Hình ảnh sản phẩm'}
          className='max-w-[450px] w-full aspect-square max-h-[450px] object-cover'
        />
      </div>
      <div className='flex mt-2 justify-between'>
        <button onClick={handlePrev} className=''>
          <FaChevronLeft color={start > 0 ? '#000' : '#ccc'} />
        </button>
        <div className='grid grid-cols-5 flex-1'>
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
        <button onClick={handleNext} className=''>
          <FaChevronRight color={end < images.length ? '#000' : '#ccc'} />
        </button>
      </div>
    </div>
  )
}
