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
    <div className='flex flex-col mb-4 pb-4 border-b-1 md:mr-4'>
      <span className='font-semibold'>{review.user.name}</span>
      <span className='flex items-center'>
        <StarComp stars={review.rating} hideNumber />
        <LuDot />
        <span>{parseDateToDMY(review.created_at)}</span>
      </span>
      <span>{review.content}</span>
      {review.images && (
        <div className='flex'>
          {review.images.map((image: string, index: number) => (
            <Popover key={index} showArrow offset={10} placement='bottom' backdrop='blur'>
              <PopoverTrigger>
                <Image
                  isZoomed
                  src={image}
                  alt='review'
                  className='object-cover overflow-hidden w-[100px] h-[100px] cursor-pointer mr-2'
                />
              </PopoverTrigger>
              <PopoverContent>
                <span>Chi tiết</span>
                <Image src={image} className='max-h-[500px]' />
              </PopoverContent>
            </Popover>
          ))}
        </div>
      )}
    </div>
  )
}
