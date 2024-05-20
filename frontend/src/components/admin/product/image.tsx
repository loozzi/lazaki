import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure
} from '@nextui-org/react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { ImageUploaderComp } from '~/components/image-uploader'
import { ImageResponse } from '~/models/product'

interface AdminProductImageProps {
  className?: string
  payload: {
    values: {
      images: ImageResponse[]
    }
    setFieldValue: (field: string, value: any) => void
    [key: string]: any
  }
}

export const AdminProductImageComp = (props: AdminProductImageProps) => {
  const { className, payload } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSetPrimary = (value: string) => {
    payload.setFieldValue(
      'images',
      payload.values.images.map((image) => {
        if (image.link === value) {
          return { ...image, isPrimary: true }
        }
        return { ...image, isPrimary: false }
      })
    )
  }

  const handleRemoveImage = (value: string) => {
    if (payload.values.images.find((image) => image.link === value)?.isPrimary) {
      return
    }

    payload.setFieldValue(
      'images',
      payload.values.images.filter((image) => image.link !== value)
    )
  }

  return (
    <div className={className}>
      <div className='mb-4 flex gap-4 justify-end'>
        <Button
          color='primary'
          variant='light'
          onClick={() => {
            onOpen()
          }}
          startContent={<FaEdit />}
        >
          Chỉnh sửa danh sách hình ảnh
        </Button>
      </div>
      <RadioGroup
        className='flex flex-wrap gap-4'
        onChange={(e) => handleSetPrimary(e.target.value)}
        value={payload.values.images.find((item) => item.isPrimary)?.link}
      >
        {payload.values.images.map((image, index) => (
          <Radio value={image.link}>
            <div className='flex gap-4 items-center'>
              <Image src={image.link} alt='product image' width={150} height={150} />
              <Input
                value={image.link}
                onChange={(e) => {
                  payload.setFieldValue(
                    'images',
                    payload.values.images.map((item, i) => {
                      if (i === index) {
                        return { ...item, link: e.target.value }
                      }
                      return item
                    })
                  )
                }}
              />
              <Button isIconOnly variant='ghost' color='danger' onClick={() => handleRemoveImage(image.link)}>
                <FaTrash />
              </Button>
            </div>
          </Radio>
        ))}
      </RadioGroup>
      <Modal isOpen={isOpen} size='3xl' onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Cập nhật hình ảnh</ModalHeader>
              <ModalBody>
                <ImageUploaderComp
                  images={payload.values.images.map((img) => img.link)}
                  onChange={(images) =>
                    payload.setFieldValue(
                      'images',
                      images.map((img) => ({
                        link: img,
                        isPrimary: payload.values.images.find((item) => item.link === img)?.isPrimary || false
                      }))
                    )
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} color='danger' variant='light'>
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
