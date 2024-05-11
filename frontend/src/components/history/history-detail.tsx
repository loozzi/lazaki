import { parseDate } from '@internationalized/date'
import { Button, Chip, DateInput, Image, Snippet } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { PriceComp } from '../price'
import { StarComp } from '../star-field'
interface HistoryDetailCompProps {
  className?: string
  history: any
}

export const HistoryDetailComp = (props: HistoryDetailCompProps) => {
  const { className, history } = props

  const [userInfor, setUserInfor] = useState<any>([])
  const [historyDetail, setHistoryDetail] = useState<any>({
    id: 1,
    date: '2021-10-10',
    total: 2000000,
    status: 'Đã giao hàng',
    items: [
      {
        id: 1,
        name: 'Áo thun nam',
        price: 100000,
        old_price: 120000,
        quantity: 10,
        image: 'https://via.placeholder.com/150',
        permalink: '/ao-thun-nam',
        reviewed: { id: 1, content: 'Sản phẩm tốt', rating: 5 }
      },
      {
        id: 2,
        name: 'Áo thun nữ',
        price: 100000,
        old_price: 120000,
        quantity: 10,
        image: 'https://via.placeholder.com/150',
        permalink: '/ao-thun-nu'
      }
    ],
    info: {
      address: '123 Xuân Thủy, Cầu Giấy, Hà Nội',
      phone: '0987654321',
      email: 'aichusad@gmail.com',
      name: 'Nguyễn Văn A'
    },
    note: 'Giao hàng giờ hành chính',
    shippingInfo: {
      name: 'Giao hàng tiết kiệm',
      code: 'GH0011231234'
    },
    payment: {
      status: false,
      method: 'Thanh toán khi nhận hàng'
    },
    orderDate: '2021-10-10',
    deliveryDate: '2021-10-11'
  })

  const handleRating = (item: any) => {
    // Call API to rate product
  }

  useEffect(() => {
    setUserInfor([
      { label: 'Họ tên', value: historyDetail.info.name },
      { label: 'SĐT', value: historyDetail.info.phone },
      { label: 'Email', value: historyDetail.info.email },
      { label: 'Địa chỉ', value: historyDetail.info.address },
      { label: 'Phương thức thanh toán', value: historyDetail.payment.method },
      { label: 'Ghi chú', value: historyDetail.note }
    ])
  }, [historyDetail])

  useEffect(() => {
    // Call API to get history detail
  }, [history])

  return (
    <div className={className}>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6'>
        <div className='flex flex-col gap-2'>
          <span className='font-semibold text-2xl text-gray-500'>Thông tin nhận hàng</span>
          <div className='flex flex-col gap-2'>
            {userInfor.map((item: any) => (
              <span className='grid grid-cols-3 gap-1'>
                <span className='font-semibold'>{item.label} </span>
                <span className='col-span-2'>{item.value}</span>
              </span>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-semibold text-2xl text-gray-500'>Trạng thái đơn hàng</span>
          <div className='flex flex-col gap-2'>
            <span className='grid grid-cols-3 gap-1'>
              <span className='font-semibold'>Trạng thái</span>{' '}
              <Chip className='col-span-2' color='success'>
                {historyDetail.status}
              </Chip>
            </span>
            <span className='grid grid-cols-3 gap-1'>
              <span className='font-semibold'>Trạng thái thanh toán</span>{' '}
              <Chip className='col-span-2' color={historyDetail.payment.status ? 'success' : 'warning'}>
                {historyDetail.payment.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </Chip>
            </span>
            <span className='grid grid-cols-3 gap-1'>
              <span className='font-semibold'>Đơn vị vận chuyển</span>{' '}
              <span className='col-span-2'>{historyDetail.shippingInfo.name}</span>
            </span>
            <span className='grid grid-cols-3 gap-1'>
              <span className='font-semibold mr-2'>Mã vận đơn</span>
              <Snippet className='col-span-2' symbol='' color='success'>
                {historyDetail.shippingInfo.code}
              </Snippet>
            </span>
            <span className='grid grid-cols-2 gap-1'>
              <DateInput label={'Ngày đặt hàng'} isDisabled defaultValue={parseDate(historyDetail.orderDate)} />
              {historyDetail.deliveryDate && (
                <DateInput label={'Ngày nhận hàng'} isDisabled defaultValue={parseDate(historyDetail.deliveryDate)} />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <span className='font-semibold text-2xl text-gray-500'>Thông tin đơn hàng</span>
        {historyDetail.items.map((item: any) => (
          <div className='grid grid-cols-1 lg:grid-cols-2 border-1 p-4 rounded-md gap-2'>
            <div className='flex gap-2 items-center'>
              <Image src={item.image} alt={item.name} className='w-24 h-24 object-cover' />
              <div className='flex flex-col gap-2'>
                <span className='font-semibold'>{item.name}</span>
                <span className='text-gray-500'>Số lượng: {item.quantity}</span>
                <div className='flex gap-2 items-center'>
                  <div className='text-sm text-blue-500'>
                    <PriceComp price={item.price} size='sm' />
                  </div>
                  <div className='text-sm text-gray-500  line-through'>
                    <PriceComp price={item.old_price} size='sm' />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex :lgjustify-end'>
              {!!item.reviewed ? (
                <div>
                  <StarComp stars={item.reviewed.rating} />{' '}
                  <span className='line-clamp-3'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus non in deserunt possimus
                    sapiente nostrum velit placeat nesciunt reprehenderit itaque, vero dicta tenetur mollitia beatae
                    architecto impedit. Officia, aut adipisci.
                  </span>
                </div>
              ) : (
                <Button
                  color='primary'
                  variant='ghost'
                  size='sm'
                  className='w-24'
                  startContent={<FaStar />}
                  onClick={() => handleRating(item)}
                >
                  Đánh giá
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-end gap-4 mt-4'>
        <div className='text-lg font-semibold flex gap-2'>
          Thành tiền: <PriceComp price={historyDetail.total} color='#3b82f6' />
        </div>
      </div>
    </div>
  )
}
