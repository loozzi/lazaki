import { Button, Chip, Image, Snippet } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { CartItem, OrderHistoryResponse } from '~/models/order'
import { ImageResponse } from '~/models/product'
import { ReviewResponse } from '~/models/review'
import { OrderStatusColor, OrderStatusName, PaymentMethodName, PaymentStatusName, parseDateToDMY } from '~/utils'
import { PriceComp } from '../price'
import { RatingComp } from '../review/rating'
import { StarComp } from '../star-field'
interface HistoryDetailCompProps {
  className?: string
  history: OrderHistoryResponse
}

export const HistoryDetailComp = (props: HistoryDetailCompProps) => {
  const { className, history } = props
  const [selectedReview, setSelectedReview] = useState<number>(-1)
  const [reviews, setReviews] = useState<ReviewResponse[]>([])

  const [userInfor, setUserInfor] = useState<{ label: string; value: any }[]>([])

  useEffect(() => {
    setUserInfor([
      { label: 'Họ tên', value: history.fullName },
      { label: 'SĐT', value: history.address!.phoneNumber },
      { label: 'Email', value: history.email },
      {
        label: 'Địa chỉ',
        value: `${history.address!.street}, ${history.address!.ward}, ${history.address!.district}, ${history.address!.province}`
      },
      { label: 'Phương thức thanh toán', value: PaymentMethodName(history.paymentMethod!) },
      { label: 'Ghi chú', value: history.note }
    ])
  }, [history])

  useEffect(() => {
    // Call API to get reviews
    setReviews([
      {
        id: 1,
        fullName: 'Nguyễn Văn A',
        variation: {
          type: 'size',
          name: 'Size',
          option: 'M'
        },
        value: 5,
        content: 'Sản phẩm rất tốt',
        created_at: '2021-09-01T00:00:00.000Z',
        variationId: 0,
        productId: 0
      }
    ])
  }, [history])

  return (
    <div className={className}>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6'>
        <div className='flex flex-col gap-2'>
          <span className='font-semibold text-2xl text-gray-500'>Thông tin nhận hàng</span>
          <div className='flex flex-col gap-2'>
            {userInfor.map((item: { label: string; value: any }) => (
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
              <Chip className='col-span-2' color={OrderStatusColor(history.status) as any}>
                {OrderStatusName(history.status)}
              </Chip>
            </span>
            <span className='grid grid-cols-3 gap-1'>
              <span className='font-semibold'>Trạng thái thanh toán</span>{' '}
              <Chip className='col-span-2' color={history.paymentStatus === 'paid' ? 'success' : 'danger'}>
                {PaymentStatusName(history.paymentStatus!)}
              </Chip>
            </span>
            <span className='grid grid-cols-3 gap-1'>
              <span className='font-semibold'>Đơn vị vận chuyển</span>{' '}
              <span className='col-span-2'>{history.shippingName}</span>
            </span>
            <span className='grid grid-cols-3 gap-1'>
              <span className='font-semibold mr-2'>Mã vận đơn</span>
              <Snippet className='col-span-2' symbol='' color='success'>
                {history.shippingCode}
              </Snippet>
            </span>
            <span className='grid grid-cols-2 gap-1'>
              {/* <DateInput label={'Ngày đặt hàng'} isDisabled defaultValue={parseDate(history.createdAt) || ''} /> */}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <span className='font-semibold text-2xl text-gray-500'>Thông tin đơn hàng</span>
        {history.orderDetails.map((item: CartItem) => (
          <div className='grid grid-cols-1 lg:grid-cols-2 border-1 p-4 rounded-md gap-2'>
            <div className='flex gap-2 items-center'>
              <Image
                src={item.images.filter((e: ImageResponse) => e.isPrimary === true)[0].link}
                alt={'Hình ảnh sản phẩm'}
                className='w-24 h-24 object-cover'
              />
              <div className='flex flex-col gap-2'>
                <span className='font-semibold'>{item.name}</span>
                <span className='text-gray-500'>
                  Số lượng: {item.quantity} | {item.variation.type}: {item.variation.option}
                </span>
                <div className='flex gap-2 items-center'>
                  <div className='text-sm text-blue-500'>
                    <PriceComp price={item.price} size='sm' />
                  </div>
                  <div className='text-sm text-gray-500  line-through'>
                    <PriceComp price={item.oldPrice} size='sm' />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex lg:justify-start'>
              {!!reviews.map((r) => r.variationId).includes(item.variationId || 0) ? (
                <div>
                  <span className='text-xs flex gap-4'>
                    <StarComp stars={reviews.filter((r) => r.variationId === item.variationId)[0].value} />{' '}
                    {parseDateToDMY(reviews.filter((r) => r.variationId === item.variationId)[0].created_at)}
                  </span>
                  <span className='line-clamp-3'>
                    {reviews.filter((r) => r.variationId === item.variationId)[0].content ||
                      'Không có đánh giá nào từ khách hàng'}
                  </span>
                </div>
              ) : selectedReview !== item.id ? (
                <div className='w-full flex justify-end items-end'>
                  <Button
                    color='primary'
                    variant='ghost'
                    size='sm'
                    className='w-24'
                    startContent={<FaStar />}
                    onClick={() => setSelectedReview(item.id || 0)}
                    disabled={history.status !== 'success'}
                  >
                    Đánh giá
                  </Button>
                </div>
              ) : (
                <div className='w-full'>
                  <RatingComp handleCancel={() => setSelectedReview(0)} item={item} orderId={history.id} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-end gap-4 mt-4'>
        <div className='text-lg font-semibold flex gap-2'>
          Thành tiền: <PriceComp price={history.totalAmount || 0} color='#3b82f6' />
        </div>
      </div>
    </div>
  )
}
