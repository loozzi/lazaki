import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { CartItem } from '~/models/order'
import { ReviewPayload } from '~/models/review'
import { ImageUploaderComp } from '../image-uploader'
import { useFormik } from 'formik'

interface RatingCompProps {
  handleCancel: () => void
  item: CartItem
  orderId: number
}

export const RatingComp = (props: RatingCompProps) => {
  const { handleCancel, item, orderId } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [rating, setRating] = useState<number>(5)
  const starValues = [1, 2, 3, 4, 5]
  const [selectedRating, setSelectedRating] = useState<number>(5)
  const [comment, setComment] = useState<string>('')

  const initialValues: ReviewPayload = useMemo(
    () => ({
      productId: item.productId!,
      value: selectedRating,
      content: comment,
      orderId: orderId,
      variationId: item.variationId!,
      images: []
    }),
    []
  )

  const payload = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const handleRating = () => {
    payload.handleSubmit()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Textarea placeholder='Nhập đánh giá của bạn' value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button size='sm' color='primary' variant='light' onClick={onOpen}>
        Tải ảnh lên
      </Button>
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

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalBody>
                <ImageUploaderComp
                  images={payload.values.images!}
                  onChange={(images) => {
                    payload.setFieldValue('images', images)
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} color='danger' variant='light'>
                  Đóng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
