import { Button, Image, Input, Radio, RadioGroup } from '@nextui-org/react'
import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { FaTrash } from 'react-icons/fa'
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
  const [newImage, setNewImage] = useState<string>('')

  const handleAddImage = () => {
    payload.setFieldValue('images', [...payload.values.images, { link: newImage, isPrimary: false }])
    setNewImage('')
  }

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
      <div className='ml-8 mb-4 flex gap-4 max-w-[540px]'>
        <Input value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder='Nhập link hình ảnh' />
        <Button isIconOnly color='primary' onClick={handleAddImage}>
          <CiSquarePlus size={24} />
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
    </div>
  )
}
