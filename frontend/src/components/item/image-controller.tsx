import { Image } from '@nextui-org/react'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface ItemImageControllerProps {
  images: any[]
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
    <div className='max-w-[450px]'>
      <div>
        <Image src={currentImage.url} alt={currentImage.alt} />
      </div>
      <div className='flex mt-2 justify-between'>
        <button onClick={handlePrev} className=''>
          {start > 0 && <FaChevronLeft />}
        </button>
        <div className='grid grid-cols-5 flex-1'>
          {getSlicedImages.map((image, index) => {
            return (
              <div key={index} onClick={() => setCurrentImage(image)}>
                <Image src={image.url} alt={image.alt} width={76} height={140} className='cursor-pointer' />
              </div>
            )
          })}
        </div>
        <button onClick={handleNext} className=''>
          {end < images.length && <FaChevronRight />}
        </button>
      </div>
    </div>
  )
}
