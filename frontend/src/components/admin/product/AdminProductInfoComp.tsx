import {
  Button,
  Chip,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { Category } from '~/models/category'
import { ProductCreatePayload, ProductUpdatePayload, PropertyPayload } from '~/models/product'

interface AdminProductInfoCompProps {
  className?: string
  payload: {
    values: ProductUpdatePayload | ProductCreatePayload
    setFieldValue: (field: string, value: any) => void
    [key: string]: any
  }
}

export const AdminProductInfoComp = (props: AdminProductInfoCompProps) => {
  const { className, payload } = props

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const [newProperty, setNewProperty] = useState<PropertyPayload | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const columns = [
    { name: 'Tên', uid: 'name' },
    { name: 'Giá trị', uid: 'value' },
    { name: 'Hành động', uid: 'action' }
  ]

  const handleChangeCategories = (keys: string) => {
    const lastKey = keys.split(',').pop()
    const lastCategoryId = parseInt(lastKey || '0')
    setSelectedCategories((prev) => {
      if (prev.includes(lastCategoryId)) {
        return prev.filter((id) => id !== lastCategoryId)
      } else {
        return [...prev, lastCategoryId]
      }
    })
  }

  const handleAddProperty = () => {
    if (!newProperty) return
    payload.setFieldValue('properties', [...payload.values.properties, newProperty])
    setNewProperty(null)
    onClose()
  }

  const handleOpenModal = () => {
    onOpen()
    setNewProperty({ name: '', value: '' })
  }

  const handleCloseModal = () => {
    onClose()
    setNewProperty(null)
  }

  const handleRemoveProperty = (index: number) => {
    payload.setFieldValue(
      'properties',
      payload.values.properties.filter((_, i) => i !== index)
    )
  }

  const handleEditProperty = (index: number, item: PropertyPayload) => {
    setNewProperty(item)
    onOpen()
    handleRemoveProperty(index)
  }

  useEffect(() => {
    setCategories([
      {
        id: 1,
        name: 'Category 1',
        slug: 'category-1',
        description: 'Lorem   '
      },
      {
        id: 2,
        name: 'Category 2',
        slug: 'category-2',
        description: 'Lorem   '
      },
      {
        id: 3,
        name: 'Category 3',
        slug: 'category-3',
        description: 'Lorem   '
      },
      {
        id: 4,
        name: 'Category 4',
        slug: 'category-4',
        description: 'Lorem   '
      }
    ])
  }, [])

  useEffect(() => {
    payload.setFieldValue('categories', selectedCategories)
  }, [selectedCategories])

  return (
    <div className={className}>
      <div className='flex flex-col gap-4'>
        <Input
          label='Tên sản phẩm'
          value={payload.values.productName}
          onChange={(e) => payload.setFieldValue('productName', e.target.value)}
        />
        <Input
          label='Đường dẫn'
          value={payload.values.slug}
          onChange={(e) => payload.setFieldValue('slug', e.target.value)}
        />
        <Textarea
          label='Mô tả'
          value={payload.values.description}
          onChange={(e) => payload.setFieldValue('description', e.target.value)}
        />

        <div className='grid grid-cols-3 gap-4'>
          {/* Category */}
          <div>
            <div className='font-semibold'>Danh mục</div>
            <Select
              items={categories}
              label='Danh mục'
              isMultiline={true}
              selectionMode='multiple'
              placeholder='Chọn danh mục'
              labelPlacement='inside'
              classNames={{
                base: 'max-w',
                trigger: 'min-h-12 py-2'
              }}
              renderValue={(items) => (
                <div className='flex flex-wrap gap-2'>
                  {items.map((item) => (
                    <Tooltip content={item.data?.description}>
                      <Chip key={item.data?.id}>{item.data?.name}</Chip>
                    </Tooltip>
                  ))}
                </div>
              )}
              onChange={(keys) => handleChangeCategories(keys.target.value)}
              defaultSelectedKeys={payload.values.categories.map((i) => i.toString())}
            >
              {(category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Property */}
          <div className='col-span-2'>
            <div className='font-semibold'>Thuộc tính</div>
            <Table
              isStriped
              removeWrapper
              bottomContent={
                <Button color='primary' startContent={<FaPlus size={16} />} onClick={handleOpenModal}>
                  Thêm thuộc tính
                </Button>
              }
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.uid} align='center'>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody>
                {payload.values.properties.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {/* <Input
                        placeholder='Tên'
                        value={payload.values.properties[index].name}
                        onChange={(e) => handleEditProperty(index, 'name', e.target.value)}
                      /> */}
                      {item.name}
                    </TableCell>
                    <TableCell>
                      {/* <Input
                        placeholder='Giá trị'
                        value={item.value}
                        onChange={(e) => handleEditProperty(index, 'value', e.target.value)}
                      /> */}
                      {item.value}
                    </TableCell>
                    <TableCell width={120}>
                      <div className='flex justify-center gap-2'>
                        <Button
                          color='warning'
                          size='sm'
                          isIconOnly
                          variant='ghost'
                          onClick={() => handleEditProperty(index, item)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          color='danger'
                          size='sm'
                          isIconOnly
                          variant='ghost'
                          onClick={() => handleRemoveProperty(index)}
                        >
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
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Chỉnh sửa thuộc tính</ModalHeader>
              <ModalBody>
                <Input
                  label='Tên'
                  value={newProperty?.name}
                  onChange={(e) => setNewProperty({ name: e.target.value, value: newProperty?.value || '' })}
                />
                <Input
                  label='Giá trị'
                  value={newProperty?.value}
                  onChange={(e) => setNewProperty({ value: e.target.value, name: newProperty?.name || '' })}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Hủy
                </Button>
                <Button color='primary' variant='solid' onPress={handleAddProperty}>
                  Lưu
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
