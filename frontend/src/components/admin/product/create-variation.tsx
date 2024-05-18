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
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { ProductCreatePayload, VariationPayload } from '~/models/product'

interface AdminCreateVariationCompProps {
  className?: string
  payload: {
    values: ProductCreatePayload
    setFieldValue: (field: string, value: any) => void
    [key: string]: any
  }
}

export const AdminCreateVariationComp = (props: AdminCreateVariationCompProps) => {
  const { className, payload } = props

  const [selectedVariation, setSelectedVariation] = useState<VariationPayload | null>(null)
  const [selectedVariationIndex, setSelectedVariationIndex] = useState<number>(-1)
  const [newVariation, setNewVariation] = useState<VariationPayload | null>(null)

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
    setNewVariation(null)
  }

  const handleCreateVariation = () => {
    if (!newVariation) return

    if (newVariation.price < 0) {
      newVariation.price = 0
    }

    if (newVariation.oldPrice < 0) {
      newVariation.oldPrice = 0
    }

    if (newVariation.quantity < 0) {
      newVariation.quantity = 0
    }

    if (newVariation.sold < 0) {
      newVariation.sold = 0
    }

    if (
      newVariation.type === '' ||
      newVariation.name === '' ||
      newVariation.option === '' ||
      newVariation.price === 0 ||
      newVariation.quantity === 0
    ) {
      return
    }

    payload.values.variations.push(newVariation)

    onClose()
  }

  const handleUpdateVariation = () => {
    if (!selectedVariation) return

    if (selectedVariation.price < 0) {
      selectedVariation.price = 0
    }

    if (selectedVariation.oldPrice < 0) {
      selectedVariation.oldPrice = 0
    }

    if (selectedVariation.quantity < 0) {
      selectedVariation.quantity = 0
    }

    if (selectedVariation.sold < 0) {
      selectedVariation.sold = 0
    }

    if (
      selectedVariation.type === '' ||
      selectedVariation.name === '' ||
      selectedVariation.option === '' ||
      selectedVariation.price === 0 ||
      selectedVariation.quantity === 0
    ) {
      return
    }

    payload.values.variations[selectedVariationIndex] = selectedVariation

    onClose()
  }

  const handleRemoveVariation = (index: number) => {
    payload.setFieldValue(
      'variations',
      payload.values.variations.filter((_, i) => i !== index)
    )
  }

  return (
    <div className={className}>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold'>Biến thể</h3>
          <Button
            onClick={() => {
              setSelectedVariation(null)
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
              {payload.values.variations.map((variation, index) => (
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
                          setNewVariation(null)
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
