import { Button, Textarea } from '@nextui-org/react'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface RatingCompProps {
  handleCancel: () => void
}

export const RatingComp = (props: RatingCompProps) => {
  const { handleCancel } = props

  const [rating, setRating] = useState<number>(0)
  const starValues = [1, 2, 3, 4, 5]
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')

  const handleRating = () => {
    console.group('Rating')
    console.log('Rating:', selectedRating)
    console.log('Comment:', comment)
    console.groupEnd()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Textarea placeholder='Nhập đánh giá của bạn' value={comment} onChange={(e) => setComment(e.target.value)} />
      <div className='flex justify-between items-center'>
        <div className='flex cursor-pointer items-center'>
          {starValues.map((value) => (
            <FaStar
              key={value}
              className={rating >= value ? 'text-yellow-400' : 'text-gray-200'}
              onMouseEnter={() => setRating(value)}
              onMouseLeave={() => setRating(selectedRating)}
              onClick={() => setSelectedRating(value)}
            />
          ))}
          {selectedRating !== 0 && <span className='ml-2'>{selectedRating}</span>}/5
        </div>
        <div className='flex justify-end gap-2'>
          <Button size='sm' color='danger' variant='light' onClick={handleCancel}>
            Hủy
          </Button>
          <Button size='sm' color='primary' onClick={handleRating}>
            Đánh giá
          </Button>
        </div>
      </div>
    </div>
  )
}
