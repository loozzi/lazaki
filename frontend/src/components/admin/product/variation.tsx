import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { ImageResponse, VariationPayload, VariationResponse } from '~/models/product'

interface AdminProductVariationProps {
  className?: string
  payload: {
    values: {
      addVariations: VariationPayload[]
      removeVariations: number[]
      editVariations: VariationPayload[]
      images: ImageResponse[]
    }
    setFieldValue: (field: string, value: any) => void
    [key: string]: any
  }
  variations: VariationResponse[]
}

export const AdminProductVariationComp = (props: AdminProductVariationProps) => {
  const { className, payload, variations } = props

  const [selectedVariation, setSelectedVariation] = useState<VariationPayload | null>(null)
  const [selectedVariationIndex, setSelectedVariationIndex] = useState<number>(-1)
  const [newVariation, setNewVariation] = useState<VariationPayload | null>(null)
  const [currentVariations, setCurrentVariations] = useState<VariationResponse[]>(variations)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const columns = [
    { name: 'Loại', uid: 'type' },
    { name: 'Tên', uid: 'name' },
    { name: 'Tùy chọn', uid: 'option' },
    { name: 'Hình ảnh', uid: 'image' },
    { name: 'Giá', uid: 'price' },
    { name: 'Giá cũ', uid: 'oldPrice' },
    { name: 'Số lượng', uid: 'quantity' },
    { name: 'Đã bán', uid: 'sold' },
    { name: 'Hành động', uid: 'actions' }
  ]

  const handleCloseModal = () => {
    onClose()
    setSelectedVariation(null)
  }

  const handleUpdateVariation = () => {
    if (selectedVariation?.id || 0 !== 0) {
      payload.setFieldValue('editVariations', [...payload.values.editVariations, selectedVariation])
    }
    setCurrentVariations(
      currentVariations.map((variation, index) =>
        index === selectedVariationIndex ? (selectedVariation! as VariationResponse) : variation
      )
    )
    onClose()
  }

  const handleCreateVariation = () => {
    payload.setFieldValue('addVariations', [...payload.values.addVariations, newVariation])
    setCurrentVariations([...currentVariations, newVariation! as VariationResponse])
    onClose()
  }

  const handleRemoveVariation = (index: number) => {
    // Kiểm tra xem đấy có phải variation đã được thêm vào db chưa
    if (variations[index]?.id || 0 !== 0) {
      payload.setFieldValue('removeVariations', [...payload.values.removeVariations, variations[index].id])
      payload.setFieldValue(
        'editVariations',
        payload.values.editVariations.filter((item) => item.id !== variations[index].id)
      )
    } else
      payload.setFieldValue(
        'addVariations',
        payload.values.addVariations.filter((_, i) => i !== index)
      )
    setCurrentVariations(currentVariations.filter((_, i) => i !== index))
  }

  useEffect(() => {
    payload.setFieldValue(
      'addVariations',
      currentVariations.filter((item) => (item?.id || 0) === 0)
    )
  }, [currentVariations])

  return (
    <div className={className}>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold'>Biến thể</h3>
          <Button
            onClick={() => {
              setSelectedVariation(null)
              setSelectedVariationIndex(-1)
              setNewVariation({
                type: '',
                name: '',
                option: '',
                image: '',
                price: 0,
                oldPrice: 0,
                quantity: 0,
                sold: 0
              })
              onOpen()
            }}
            variant='light'
            color='primary'
          >
            <FaEdit />
            <span>Thêm biến thể</span>
          </Button>
        </div>
        <div>
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align='center'>
                  <span>{column.name}</span>
                </TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {currentVariations.map((variation, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{variation.type}</TableCell>
                  <TableCell align='center'>{variation.name}</TableCell>
                  <TableCell align='center'>{variation.option}</TableCell>
                  <TableCell align='center'>{variation.image}</TableCell>
                  <TableCell align='center'>{variation.price}</TableCell>
                  <TableCell align='center'>{variation.oldPrice}</TableCell>
                  <TableCell align='center'>{variation.quantity}</TableCell>
                  <TableCell align='center'>{variation.sold}</TableCell>
                  <TableCell align='center' width={120}>
                    <div className='flex gap-2'>
                      <Button
                        onClick={() => {
                          setSelectedVariation(variation)
                          setSelectedVariationIndex(index)
                          onOpen()
                        }}
                        variant='ghost'
                        color='warning'
                        isIconOnly
                      >
                        <FaEdit />
                      </Button>
                      <Button variant='ghost' color='danger' isIconOnly onClick={() => handleRemoveVariation(index)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{selectedVariation ? 'Chỉnh sửa biến thể' : 'Thêm biến thể'}</ModalHeader>
              <ModalBody>
                {selectedVariation ? (
                  <div className='flex flex-col gap-2'>
                    {columns
                      .filter((i) => i.uid !== 'actions')
                      .map((column) => (
                        <Input
                          value={(selectedVariation[column.uid as keyof VariationPayload] as string) || ''}
                          label={column.name}
                          placeholder={column.name}
                          type={
                            column.uid === 'price' ||
                            column.uid === 'oldPrice' ||
                            column.uid === 'quantity' ||
                            column.uid === 'sold'
                              ? 'number'
                              : 'text'
                          }
                          onChange={(e) => {
                            setSelectedVariation({ ...selectedVariation, [column.uid]: e.target.value })
                          }}
                        />
                      ))}
                  </div>
                ) : (
                  <div className='flex flex-col gap-2'>
                    {columns
                      .filter((i) => i.uid !== 'actions')
                      .map((column) => (
                        <Input
                          value={(newVariation![column.uid as keyof VariationPayload] as string) || ''}
                          label={column.name}
                          placeholder={column.name}
                          type={
                            column.uid === 'price' ||
                            column.uid === 'oldPrice' ||
                            column.uid === 'quantity' ||
                            column.uid === 'sold'
                              ? 'number'
                              : 'text'
                          }
                          onChange={(e) => {
                            setNewVariation({ ...newVariation!, [column.uid]: e.target.value })
                          }}
                        />
                      ))}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Hủy
                </Button>
                <Button
                  color='primary'
                  variant='solid'
                  onPress={selectedVariation ? handleUpdateVariation : handleCreateVariation}
                >
                  {selectedVariation ? 'Lưu' : 'Thêm'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
