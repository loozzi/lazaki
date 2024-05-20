import { Button, Chip, Image } from '@nextui-org/react'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'
import { CartItem, OrderHistoryResponse } from '~/models/order'
import { OrderStatusColor, OrderStatusName, PaymentStatusName } from '~/utils'
import { PriceComp } from '../price'

interface HistoryCompProps {
  history: OrderHistoryResponse
  className?: string
}

export const HistoryComp = (props: HistoryCompProps) => {
  const { history, className } = props

  return (
    <div className={className}>
      <div className='p-4 bg-white rounded-md border-1 border-gray-200'>
        <div className='flex justify-between gap-4 items-center border-b-1 border-gray-200 pb-2'>
          <div className='text-gray-400'>{history.createdAt}</div>
          <div className='text-lg font-semibold capitalize flex gap-2'>
            <Chip color={OrderStatusColor(history.status)} size='sm'>
              {OrderStatusName(history.status)}
            </Chip>
            <Chip color={history.paymentStatus === 'paid' ? 'success' : 'danger'} size='sm'>
              {PaymentStatusName(history.paymentStatus!)}
            </Chip>
          </div>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          {history.orderDetails.map((item: CartItem) => (
            <div key={item.id} className='flex justify-between gap-4 border-b-1 border-gray-200 pb-2'>
              <div className='flex gap-4 items-center'>
                <Image src={item.image} alt={item.name} className='w-20 h-20 object-cover' />
                <div className='flex flex-col gap-2'>
                  <div className='text-lg font-semibold'>{item.name}</div>
                  <div className='flex gap-4'>
                    <div className='text-sm text-gray-500 capitalize'>
                      {item.variation.type}: {item.variation.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 items-end'>
                <div className='text-sm text-gray-500'>Số lượng: {item.quantity}</div>
                <div className=''>
                  <div className='text-sm text-blue-500'>
                    <PriceComp price={item.price || 0} size='sm' />
                  </div>
                  <div className='text-sm text-gray-500  line-through'>
                    <PriceComp price={item.oldPrice || 0} size='sm' />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-between items-end gap-4'>
            <div>
              <Button
                color='primary'
                variant='ghost'
                size='md'
                startContent={<FaEye />}
                as={Link}
                to={routes.client.rating.replace(':orderId', history.id.toString())}
              >
                Xem chi tiết
              </Button>
            </div>
            <div className='text-lg font-semibold flex gap-2'>
              Thành tiền: <PriceComp price={history.totalAmount || 0} color='#3b82f6' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
