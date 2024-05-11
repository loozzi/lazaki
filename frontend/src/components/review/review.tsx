import { Image, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { StarComp } from '../star-field'
import { LuDot } from 'react-icons/lu'
import { parseDateToDMY } from '~/utils'
interface ViewReviewProps {
  review: any
}
export const ViewReviewComp = (props: ViewReviewProps) => {
  const { review } = props
  return (
    <div className='flex flex-col mb-4 p-4 md:mr-4 border-solid border-black-1/10 border-1 rounded-xl'>
      <StarComp stars={review.rating} hideNumber />
      <span className='flex items-center'>
        <span className='font-semibold'>{review.user.name}</span>
        <LuDot />
        <span className='text-gray-400'>{parseDateToDMY(review.created_at)}</span>
      </span>
      <span className='my-2'>{review.content}</span>
      {review.images && (
        <div className='flex flex-wrap gap-2'>
          {review.images.map((image: string, index: number) => (
            <Popover key={index} showArrow offset={10} placement='bottom' backdrop='blur'>
              <PopoverTrigger>
                <Image
                  isZoomed
                  src={image}
                  alt='review'
                  className='object-cover overflow-hidden w-[100px] h-[100px] cursor-pointer'
                />
              </PopoverTrigger>
              <PopoverContent>
                <span>{review.user.name}</span>
                <Image src={image} className='max-h-[500px]' />
              </PopoverContent>
            </Popover>
          ))}
        </div>
      )}
    </div>
  )
}
