import { Image, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { StarComp } from '../star-field'
import { LuDot } from 'react-icons/lu'
import { parseDateToDMY } from '~/utils'
import { ReviewResponse } from '~/models/review'
interface ViewReviewProps {
  review: ReviewResponse
}
export const ViewReviewComp = (props: ViewReviewProps) => {
  const { review } = props
  return (
    <div className='flex flex-col mb-4 p-4 md:mr-4 border-solid border-black-1/10 border-1 rounded-xl'>
      <span className='flex items-center'>
        <span className='font-semibold'>{review.fullName}</span>
        <LuDot />
        <span className='text-gray-400'>{parseDateToDMY(review.createdAt)}</span>
      </span>
      <span className='my-1 text-gray-400 flex gap-2 items-center'>
        <StarComp stars={review.value} hideNumber />
        <LuDot />
        {review.variation?.type} - {review.variation?.name}
      </span>
      <span className='my-2'>
        {review.content ? <p>{review.content}</p> : <p className='text-gray-400'>Không có nội dung</p>}
      </span>
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
                <span>{review.fullName}</span>
                <Image src={image} className='max-h-[500px]' />
              </PopoverContent>
            </Popover>
          ))}
        </div>
      )}
    </div>
  )
}
