import {
  Button,
  Image,
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
import adminService from '~/services/admin.service'

export const ViewAdminManageProductPage = () => {
  const [products, setProducts] = useState<ProductAdminResponse[]>([])
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    perPage: 10,
    total: 1
  })
  const [keyword, setKeyword] = useState<string>('')
  const [type, setType] = useState<'quantity' | 'sold'>('quantity')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const [limit, setLimit] = useState<number>(10)

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setLoading(true)
      setProducts([])
      adminService.product
        .get({
          keyword,
          order: sort,
          type,
          page: pagination.currentPage,
          perPage: pagination.perPage,
          limit: limit
        })
        .then((res) => {
          const products = res.data?.data || []
          setProducts(products)
          setPagination({
            currentPage: res.data?.currentPage || 1,
            perPage: res.data?.perPage || 10,
            total: res.data?.total || 0
          })
          setLoading(false)
        })
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [keyword, sort, type, pagination.currentPage, pagination.perPage, limit])

  const columns = [
    { name: 'Hình ảnh', uid: 'image' },
    { name: 'Tên sản phẩm', uid: 'name' },
    { name: 'Danh mục', uid: 'categories' },
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
          label='Tìm kiếm'
          placeholder='Tìm kiếm tên sản phẩm'
          startContent={<CiSearch />}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button as={Link} to={routes.admin.productCreate} color='primary' variant='light' startContent={<FaEdit />}>
          Thêm sản phẩm
        </Button>
      </div>
      <div className='mt-4'>
        <Table
          isStriped
          topContent={
            <div className='flex justify-between'>
              <div className='w-[480px] max-w-[480px] flex gap-2'>
                <Select
                  label='Sắp xếp'
                  selectedKeys={[sort]}
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
                  label='Theo'
                  selectedKeys={[type]}
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
                <Select
                  label='Số lượng'
                  selectedKeys={[limit.toString()]}
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value))
                  }}
                >
                  <SelectItem value='10' key='10'>
                    10
                  </SelectItem>
                  <SelectItem value='20' key='20'>
                    20
                  </SelectItem>
                  <SelectItem value='50' key='50'>
                    50
                  </SelectItem>
                  <SelectItem value='100' key='100'>
                    100
                  </SelectItem>
                  <SelectItem value='200' key='200'>
                    200
                  </SelectItem>
                </Select>
              </div>
            </div>
          }
          bottomContent={
            <div className='flex flex-col items-center'>
              {loading && (
                <div className='flex justify-center items-center mt-4'>
                  <div className='animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900' />
                </div>
              )}
              <div className='flex justify-between'>
                <div className='flex gap-2'>
                  <span className='text-sm'>
                    Hiển thị {Math.min(pagination.perPage, products.length)} trong {pagination.total} sản phẩm
                  </span>
                </div>
              </div>

              <Pagination
                className='flex justify-center mt-2'
                total={Math.ceil(pagination.total / pagination.perPage)}
                page={pagination.currentPage}
                onChange={(page) => setPagination({ ...pagination, currentPage: page })}
              />
            </div>
          }
        >
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
              <TableRow key={item.slug}>
                <TableCell width={48}>
                  <Image src={item.image} alt={item.name} width={48} height={48} />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell width={120}>
                  <div className='flex justify-start'>
                    <Tooltip content={item.category.join(', ')}>
                      <span className='line-clamp-1'>{item.category.join(', ')}</span>
                    </Tooltip>
                  </div>
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
      </div>
    </div>
  )
}
