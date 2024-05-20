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
import { ReviewPayload, ReviewResponse } from '~/models/review'
import { ImageUploaderComp } from '../image-uploader'
import { useFormik } from 'formik'
import reviewService from '~/services/review.service'

interface RatingCompProps {
  handleCancel: () => void
  item: CartItem
  onSuccess?: (values: ReviewResponse) => void
  onFailed?: () => {}
}

export const RatingComp = (props: RatingCompProps) => {
  const { handleCancel, item, onSuccess, onFailed } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [rating, setRating] = useState<number>(5)
  const starValues = [1, 2, 3, 4, 5]

  const initialValues: ReviewPayload = useMemo(
    () => ({
      productId: item.productId!,
      value: 5,
      content: '',
      orderDetailId: item.id!,
      variationId: item.variationId!,
      images: []
    }),
    []
  )

  const payload = useFormik({
    initialValues,
    onSubmit: (values) => {
      reviewService.create(values).then((res) => {
        if (res.status === 200) {
          onSuccess?.(res.data)
        } else {
          onFailed?.()
        }
      })
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
      <Textarea
        placeholder='Nhập đánh giá của bạn'
        value={payload.values.content}
        onChange={(e) => payload.setFieldValue('content', e.target.value)}
      />
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
              onMouseLeave={() => setRating(payload.values.value)}
              onClick={() => payload.setFieldValue('value', value)}
            />
          ))}
          {payload.values.value !== 0 && <span className='ml-2'>{payload.values.value}</span>}/5
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
