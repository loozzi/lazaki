import { Image } from '@nextui-org/react'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { ImageResponse } from '~/models/product'

interface ItemImageControllerProps {
  images: ImageResponse[]
}

export const ItemImageControllerComp = (props: ItemImageControllerProps) => {
  const { images } = props

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

  return (
    <div className={'md:max-w-[450px] w-full mx-2 md:mx-0'}>
      <div>
        <Image src={currentImage.link} alt={'Hình ảnh sản phẩm'} />
      </div>
      <div className='flex mt-2 justify-between'>
        <button onClick={handlePrev} className=''>
          <FaChevronLeft color={start > 0 ? '#000' : '#ccc'} />
        </button>
        <div className='grid grid-cols-5 flex-1'>
          {getSlicedImages.map((image, index) => {
            return (
              <div key={index} onClick={() => setCurrentImage(image)}>
                <Image src={image.link} alt={'Hình ảnh sản phẩm'} width={76} height={140} className='cursor-pointer' />
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
