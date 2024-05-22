import { Button, Image, Input, Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaEdit, FaFileExport } from 'react-icons/fa'
import { useParams } from 'react-router'
import { OrderHistoryResponse, OrderStatusType, PaymentStatusType } from '~/models/order'
import adminService from '~/services/admin.service'

export const ViewAdminDetailOrderPage = () => {
  const params = useParams<{ orderId: string }>()
  const [order, setOrder] = useState<OrderHistoryResponse | undefined>(undefined)

  const [shippingName, setShippingName] = useState<string>('')
  const [shippingCode, setShippingCode] = useState<string>('')

  const handleUpdateShippingInfo = () => {
    if (!order) return
    adminService.order
      .update('shipping', {
        orderId: order.id,
        shippingName: shippingName,
        shippingCode: shippingCode
      })
      .then((res) => {
        if (res.data) {
          setOrder(res.data)
        }
      })
  }

  const handleUpdatePaymentStatus = (status: 'unpaid' | 'paid') => {
    if (!order) return
    adminService.order
      .update('paymentStatus', {
        orderId: order.id,
        paymentStatus: status
      })
      .then((res) => {
        if (res.data) {
          setOrder(res.data)
        }
      })
  }

  const handleUpdateOrderStatus = (status: OrderStatusType) => {
    if (!order) return
    adminService.order
      .update('status', {
        orderId: order.id,
        status: status
      })
      .then((res) => {
        if (res.data) {
          setOrder(res.data)
        }
      })
  }

  useEffect(() => {
    adminService.order.detail(parseInt(params.orderId || '0')).then((res) => {
      setOrder(res.data)
    })
  }, [params.orderId])

  useEffect(() => {
    setShippingName(order?.shippingName || '')
    setShippingCode(order?.shippingCode || '')
  }, [order])

  return (
    <div className='p-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibol mb-4'>Chi tiết đơn hàng</h1>
        <Button startContent={<FaFileExport />} onClick={() => alert('Tính năng đang được phát triển')}>
          Xuất hóa đơn
        </Button>
      </div>
      {order && (
        <div className='flex flex-col gap-4'>
          <div>
            <h2 className='text-xl'>Thông tin đơn hàng</h2>
            <div className='flex flex-col gap-2'>
              <div className='grid grid-cols-2 gap-2'>
                <span>Trạng thái đơn hàng</span>
                <span>
                  <Select
                    selectedKeys={[order.status]}
                    onChange={(e) => handleUpdateOrderStatus(e.target.value as OrderStatusType)}
                  >
                    <SelectItem key='cancel' value='cancel'>
                      Đã hủy
                    </SelectItem>
                    <SelectItem key='shipping' value='shipping'>
                      Đang giao hàng
                    </SelectItem>
                    <SelectItem key='preparing' value='preparing'>
                      Đang chuẩn bị
                    </SelectItem>
                    <SelectItem key='success' value='success'>
                      Thành công
                    </SelectItem>
                  </Select>
                </span>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <span>Trạng thái thanh toán</span>
                <span>
                  <Select
                    selectedKeys={[order.paymentStatus || 'unpaid']}
                    onChange={(e) => handleUpdatePaymentStatus(e.target.value as PaymentStatusType)}
                  >
                    <SelectItem key='unpaid' value='unpaid'>
                      Chưa thanh toán
                    </SelectItem>
                    <SelectItem key='paid' value='paid'>
                      Đã thanh toán
                    </SelectItem>
                  </Select>
                </span>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <span>Thông tin vận chuyển</span>
                <span>
                  <span className='flex gap-2 items-center mb-2'>
                    <Input
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      label='Tên đơn vị vận chuyển'
                    />
                    <Input value={shippingCode} onChange={(e) => setShippingCode(e.target.value)} label='Mã vận đơn' />
                  </span>
                  <Button startContent={<FaEdit />} size='sm' onClick={handleUpdateShippingInfo}>
                    Chỉnh sửa
                  </Button>
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-xl'>Thông tin người nhận</h2>
            <div className='max-w-[540px]'>
              <div className='grid grid-cols-2 gap-2'>
                <span>Họ tên </span>
                <span>{order.fullName}</span>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <span>Email</span> <span>{order.email}</span>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <span>Số điện thoại</span> <span>{order.phone}</span>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <span>Địa chỉ</span>
                <span>{`${order.address?.street}, ${order.address?.ward}, ${order.address?.district}, ${order.address?.province}`}</span>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <span>Ghi chú</span> <span>{order.note}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-xl'>Đơn hàng chi tiết</h2>
            <div>
              {order.orderDetails.map((item, index) => (
                <div key={index} className='flex'>
                  <div className='w-20'>
                    <Image src={item.image} alt={item.name} className='w-16 h-16' />
                  </div>
                  <div className='flex-1 flex justify-between'>
                    <div className='flex flex-col'>
                      <div className='font-semibold'>{item.name}</div>
                      <div className='flex gap-2 text-sm'>
                        <div className='font-semibold'>{item.variation.type}</div>
                        <div>{item.variation.name}</div>
                      </div>
                    </div>
                    <div>
                      <div className='grid grid-cols-2 gap-2'>
                        <span>Số lượng: </span>
                        <span>{item.quantity}</span>
                      </div>
                      <div className='grid grid-cols-2 gap-2'>
                        <span>Đơn giá: </span>
                        <span>{item.price.toLocaleString()}</span>
                      </div>
                      <div className='grid grid-cols-2 gap-2 text-orange-600'>
                        <span>Tổng giá: </span>
                        <span>{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-end text-2xl'>
            Tổng giá trị: <span className='text-orange-600'>{order.totalAmount?.toLocaleString()} VNĐ</span>
          </div>
        </div>
      )}
      {!order && <div className='text-center text-gray-600'>Không tìm thấy đơn hàng</div>}
    </div>
  )
}
