import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaEdit, FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'
import { ProductAdminResponse } from '~/models/product'
import { PaginationState } from '~/models/response'

export const ViewAdminManageProductPage = () => {
  const [products, setProducts] = useState<ProductAdminResponse[]>([])
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    perPage: 10,
    total: 3
  })
  const [keyword, setKeyword] = useState<string>('')
  const [type, setType] = useState<'quantity' | 'sold'>('quantity')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'Product 1',
        price: 10000,
        quantity: 10,
        status: 'active',
        slug: 'sample-product-1',
        sold: 0,
        image: '',
        rating: 0,
        categories: ['Category 1', 'Category 2', 'Category 2', 'Category 2']
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20000,
        quantity: 20,
        status: 'active',
        slug: 'sample-product-2',
        sold: 0,
        image: '',
        rating: 0,
        categories: []
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30000,
        quantity: 30,
        status: 'active',
        slug: 'sample-product-3',
        sold: 0,
        image: '',
        rating: 0,
        categories: []
      }
    ])
  }, [pagination, keyword, type, sort])

  const columns = [
    { name: 'ID', uid: 'id' },
    { name: 'Tên sản phẩm', uid: 'name' },
    { name: 'Danh mục', uid: 'categories' },
    { name: 'Giá', uid: 'price' },
    { name: 'Đã bán', uid: 'sold' },
    { name: 'Kho hàng', uid: 'quantity' },
    { name: 'Đánh giá', uid: 'rating' },
    { name: 'Hành động', uid: 'actions' }
  ]

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibol mb-4'>Quản lý sản phẩm</h1>
      <div className='mt-4 w-full flex justify-between'>
        <Input
          className='max-w-[560px]'
          placeholder='Tên sản phẩm'
          endContent={<CiSearch />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button color='primary' variant='light' startContent={<FaEdit />}>
          Thêm sản phẩm
        </Button>
      </div>
      <div className='mt-4'>
        <Table isStriped>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align='center'>
                <span className={!['name', 'categories'].includes(column.uid) ? 'flex justify-center' : ''}>
                  {column.name}
                </span>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={products}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell width={48}>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell width={120}>
                  <div className='flex justify-center'>
                    <Tooltip content={item.categories.join(', ')}>
                      <span className='line-clamp-1'>{item.categories.join(', ')}</span>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell width={120} align='center'>
                  <div className='flex justify-center'>{item.price}</div>
                </TableCell>
                <TableCell width={60}>
                  <div className='flex justify-center'>{item.sold}</div>
                </TableCell>
                <TableCell width={60}>
                  <div className='flex justify-center'>{item.quantity}</div>
                </TableCell>
                <TableCell width={60}>
                  <div className='flex justify-center'>{item.rating}</div>
                </TableCell>
                <TableCell width={240}>
                  <div className='flex justify-center'>
                    <Button
                      as={Link}
                      to={routes.admin.productDetail.replace(':slug', item.slug)}
                      color='secondary'
                      variant='ghost'
                      startContent={<FaEye />}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className='flex justify-between'>
          <div className='w-64 flex gap-2'>
            <Select
              placeholder='Sắp xếp'
              selectedKeys={['asc']}
              onChange={(e) => {
                setSort(e.target.value as 'asc' | 'desc')
              }}
            >
              <SelectItem value='asc' key='asc'>
                Tăng dần
              </SelectItem>
              <SelectItem value='desc' key='desc'>
                Giảm dần
              </SelectItem>
            </Select>
            <Select
              placeholder='Theo'
              selectedKeys={['quantity']}
              onChange={(e) => {
                setType(e.target.value as 'quantity' | 'sold')
              }}
            >
              <SelectItem value='quantity' key='quantity'>
                Kho hàng
              </SelectItem>
              <SelectItem value='sold' key='sold'>
                Đã bán
              </SelectItem>
            </Select>
          </div>
          <Pagination className='flex justify-center mt-2' total={pagination.total} page={pagination.currentPage} />
        </div>
      </div>
    </div>
  )
}
