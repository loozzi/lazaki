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
import { CiSearch } from 'react-icons/ci'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'
import { Category, CategoryCreatePayload, CategoryUpdatePayload } from '~/models/category'
import adminService from '~/services/admin.service'
import categoryService from '~/services/category.service'
import { stringToSlug } from '~/utils'

export const ViewAdminManageCategoryPage = () => {
  document.title = 'Quản lý danh mục'
  const [categories, setCategories] = useState<Category[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [filterCategories, setFilterCategories] = useState<Category[]>([])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const [inputName, setName] = useState<string>('')
  const [inputDescription, setDescription] = useState<string>('')
  const [inputSlug, setSlug] = useState<string>('')

  const columns = [
    { name: 'ID', uid: 'id' },
    { name: 'Tên danh mục', uid: 'name' },
    { name: 'Đường dẫn', uid: 'slug' },
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
    if (!inputSlug) {
      setSlug(stringToSlug(inputName))
      return
    }
    const payload: CategoryCreatePayload = {
      name: inputName,
      description: inputDescription,
      slug: inputSlug.split(' ').join('-')
    }

    adminService.category.create(payload).then((res) => {
      if (res.data) {
        setCategories([...categories, res.data])
        handleCloseModal()
      }
    })
  }

  const handleUpdateCategory = () => {
    if (!inputName) return

    if (!inputSlug) {
      setSlug(stringToSlug(inputName))
      return
    }

    if (selectedCategory) {
      const payload: CategoryUpdatePayload = {
        id: selectedCategory.id,
        name: inputName,
        description: inputDescription,
        slug: inputSlug
      }
      adminService.category.update(payload).then((res) => {
        if (res.data) {
          const index = categories.findIndex((item) => item.id === res.data!.id)
          if (index !== -1) {
            const newCategories = [...categories]
            newCategories[index] = res.data
            setCategories(newCategories)
          }
          handleCloseModal()
        }
      })
    }
  }

  useEffect(() => {
    categoryService.getAll().then((res) => {
      if (res.data) {
        setCategories(res.data)
      }
    })
  }, [])

  useEffect(() => {
    if (keyword) {
      setFilterCategories(
        categories.filter(
          (item) =>
            item.name.toLowerCase().includes(keyword.toLowerCase()) ||
            item.slug.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    } else {
      setFilterCategories(categories)
    }
  }, [categories, keyword])

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name)
      setDescription(selectedCategory.description)
      setSlug(selectedCategory.slug)
    } else {
      setName('')
      setDescription('')
      setSlug('')
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
        <Table
          isStriped
          topContent={
            <Input
              label='Tìm kiếm'
              placeholder='Tìm kiếm danh mục'
              startContent={<CiSearch />}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align='center'>
                <span className={column.uid === 'action' ? 'flex justify-center' : ''}>{column.name}</span>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={filterCategories}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell width={28}>{item.id}</TableCell>
                <TableCell width={240}>{item.name}</TableCell>
                <TableCell width={240}>{item.slug}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell width={120}>
                  <div className='flex gap-2'>
                    <Button
                      isIconOnly
                      variant='ghost'
                      color='secondary'
                      size='sm'
                      as={Link}
                      to={routes.admin.product + '?category=' + item.slug}
                    >
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
                      size='sm'
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      isIconOnly
                      variant='ghost'
                      onClick={() => handleRemoveCategory(item.id)}
                      color='danger'
                      size='sm'
                    >
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
                <Input
                  label='Đường dẫn'
                  placeholder='Đường dẫn'
                  value={inputSlug}
                  onChange={(e) => setSlug(e.target.value)}
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
