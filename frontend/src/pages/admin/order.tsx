import {
  Button,
  Chip,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { OrderHistoryResponse } from '~/models/order'
import { PaginationState } from '~/models/response'
import adminService from '~/services/admin.service'
import { OrderStatusColor, OrderStatusName, parseTimeToHM } from '~/utils'

export const ViewAdminOrderPage = () => {
  const [orders, setOrders] = useState<OrderHistoryResponse[]>([])
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    perPage: 10,
    total: 1
  })
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const [limit, setLimit] = useState<number>(10)

  const columns = [
    { uid: 'id', name: 'ID' },
    { uid: 'fullName', name: 'Tên khách hàng' },
    { uid: 'status', name: 'Trạng thái' },
    { uid: 'totalAmount', name: 'Tổng tiền' },
    { uid: 'orderDate', name: 'Ngày đặt' },
    { uid: 'actions', name: 'Hành động' }
  ]

  useEffect(() => {
    adminService.order.get({ page: pagination.currentPage, limit: limit }).then((res) => {
      if (res.data) {
        setOrders(res.data.data)
      }
    })
  }, [pagination.currentPage, limit])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibol mb-4'>Quản lý đơn hàng</h1>
      <div className='mt-4 w-full flex justify-between'>
        <Table
          isStriped
          topContent={
            <div>
              <Select selectedKeys={[sort]} onChange={(e) => setSort(e.target.value as 'asc' | 'desc')}>
                <SelectItem key='asc' value='asc'>
                  Mới nhất
                </SelectItem>
                <SelectItem key='desc' value='desc'>
                  Cũ nhất
                </SelectItem>
              </Select>
            </div>
          }
          bottomContent={
            <div className='flex justify-center gap-4 items-center'>
              <Select
                selectedKeys={[limit.toString()]}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className='w-24'
              >
                <SelectItem key={10} value={10}>
                  10
                </SelectItem>
                <SelectItem key={20} value={20}>
                  20
                </SelectItem>
                <SelectItem key={50} value={50}>
                  50
                </SelectItem>
                <SelectItem key={100} value={100}>
                  100
                </SelectItem>
                <SelectItem key={200} value={200}>
                  200
                </SelectItem>
              </Select>
              <Pagination
                page={pagination.currentPage}
                total={Math.ceil(pagination.total / pagination.perPage)}
                onChange={(e) => setPagination({ ...pagination, currentPage: e })}
              />
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align='center'>
                {/* <span className={!['name', 'categories'].includes(column.uid) ? 'flex justify-center' : ''}> */}
                {column.name}
                {/* </span> */}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={orders}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell width={48}>
                  <span>{item.id}</span>
                </TableCell>
                <TableCell>
                  <span>{item.fullName}</span>
                </TableCell>
                <TableCell>
                  <Chip color={OrderStatusColor(item.status)}>{OrderStatusName(item.status)}</Chip>
                </TableCell>
                <TableCell>
                  <span>{item.totalAmount!.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <span>{parseTimeToHM(item.orderDate)}</span>
                </TableCell>
                <TableCell>
                  <Button variant='ghost' startContent={<FaEye />}>
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
