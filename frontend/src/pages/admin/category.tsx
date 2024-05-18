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
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { Category } from '~/models/category'
import { CategoryPayload } from '~/models/product'

export const ViewAdminManageCategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const [inputName, setName] = useState<string>('')
  const [inputDescription, setDescription] = useState<string>('')

  const columns = [
    { name: 'ID', uid: 'id' },
    { name: 'Tên danh mục', uid: 'name' },
    { name: 'Mô tả', uid: 'description' },
    { name: 'Hành động', uid: 'action' }
  ]

  const handleRemoveCategory = (id: number) => {
    console.log('Remove category', id)
  }

  const handleCloseModal = () => {
    setSelectedCategory(null)
    onClose()
  }

  const handleOpenModal = () => {
    onOpen()
  }

  const handleCreateCategory = () => {
    if (!inputName) return

    const payload: CategoryPayload = {
      name: inputName,
      description: inputDescription
    }
    console.log('Create category', payload)
  }

  const handleUpdateCategory = () => {
    if (!inputName) return

    if (selectedCategory) {
      const payload: CategoryPayload = {
        id: selectedCategory.id,
        name: inputName,
        description: inputDescription
      }
      console.log('Update category', selectedCategory.id, payload)
    }
  }

  useEffect(() => {
    setCategories([
      {
        id: 1,
        name: 'Category 1',
        slug: 'category-1',
        description: 'Description 1'
      },
      {
        id: 2,
        name: 'Category 2',
        slug: 'category-2',
        description: 'Description 2'
      },
      {
        id: 3,
        name: 'Category 3',
        slug: 'category-3',
        description: 'Description 3'
      },
      {
        id: 4,
        name: 'Category 4',
        slug: 'category-4',
        description: 'Description 4'
      },
      {
        id: 5,
        name: 'Category 5',
        slug: 'category-5',
        description: 'Description 5'
      }
    ])
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name)
      setDescription(selectedCategory.description)
    } else {
      setName('')
      setDescription('')
    }
  }, [selectedCategory])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibol mb-4'>Quản lý danh mục</h1>
      <div>
        <div className='flex justify-end mb-4'>
          <Button
            color='primary'
            variant='light'
            onPress={() => {
              handleOpenModal()
              setSelectedCategory(null)
            }}
            startContent={<FaEdit />}
          >
            Thêm danh mục
          </Button>
        </div>
        <Table isStriped>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align='center'>
                <span className={column.uid === 'action' ? 'flex justify-center' : ''}>{column.name}</span>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={categories}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell width={28}>{item.id}</TableCell>
                <TableCell width={240}>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell width={120}>
                  <div className='flex gap-2'>
                    <Button isIconOnly variant='ghost' color='secondary'>
                      <FaEye />
                    </Button>
                    <Button
                      isIconOnly
                      variant='ghost'
                      onClick={() => {
                        setSelectedCategory(item)
                        handleOpenModal()
                      }}
                      color='warning'
                    >
                      <FaEdit />
                    </Button>
                    <Button isIconOnly variant='ghost' onClick={() => handleRemoveCategory(item.id)} color='danger'>
                      <FaTrash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Modal title='Thêm danh mục' isOpen={isOpen} onClose={handleCloseModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{selectedCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}</ModalHeader>
              <ModalBody>
                <Input
                  label='Tên danh mục'
                  placeholder='Tên danh mục'
                  value={inputName}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Textarea
                  label='Mô tả'
                  placeholder='Mô tả'
                  value={inputDescription}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Hủy
                </Button>
                <Button
                  color='primary'
                  variant='solid'
                  onPress={selectedCategory ? handleUpdateCategory : handleCreateCategory}
                >
                  {selectedCategory ? 'Lưu' : 'Thêm'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
