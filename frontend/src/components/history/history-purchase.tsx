import { Pagination } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { OrderHistoryResponse } from '~/models/order'
import { ProductDetailResponse } from '~/models/product'
import { PaneComp } from '../pane'
import { HistoryComp } from './history'

interface HistoryPurchaseProps {
  className?: string
}

export const HistoryPurchaseComp = (props: HistoryPurchaseProps) => {
  const { className } = props
  const [histories, setHistories] = useState<OrderHistoryResponse[]>([])
  // const [productDetails, setProductDetails] = useState<ProductResponse[]>([])

  useEffect(() => {
    setHistories([
      {
        id: 1,
        customerId: 1,
        fullName: 'Nguyễn Văn A',
        address: {
          id: 1,
          phoneNumber: '0123456789',
          province: 'Hà Nội',
          district: 'Quận Hai Bà Trưng',
          ward: 'Phường Lê Đại Hành',
          street: 'Số 1 Đại Cồ Việt'
        },
        paymentMethod: 'cod',
        paymentStatus: 'unpaid',
        note: 'Giao hàng vào buổi sáng',
        status: 'preparing',
        shippingName: 'Giao hàng tiết kiệm',
        shippingCode: 'GHTK',
        orderDetails: [
          {
            id: 1,
            productId: 1,
            name: 'Áo thun nam',
            image: 'https://via.placeholder.com/150',
            variationId: 1,
            variation: {
              type: 'size',
              name: 'Size',
              option: 'M'
            },
            quantity: 1,
            price: 100000,
            oldPrice: 120000
          }
        ],
        totalAmount: 100000,
        createdAt: '2021-09-01T00:00:00.000Z'
      }
    ])
  }, [])

  useEffect(() => {
    const prods = histories.map((history) => history.orderDetails.map((item) => item.productId))
    // console.log(Array.from(new Set(prods.flat())))
    // fetch product details
    const productDetails: ProductDetailResponse[] = [
      {
        id: 1,
        name: 'Áo thun nam',
        description: 'Áo thun nam hàng hiệu',
        properties: [],
        variations: [
          {
            id: 1,
            type: 'size',
            name: 'Size',
            option: 'M',
            image: 'https://via.placeholder.com/150',
            price: 100000,
            oldPrice: 120000,
            quantity: 10,
            sold: 0
          }
        ],
        images: [
          {
            link: 'https://via.placeholder.com/150',
            variationId: 1,
            isPrimary: true
          }
        ],
        categories: []
      }
    ]

    setHistories((histories) =>
      histories.map((history) => ({
        ...history,
        orderDetails: history.orderDetails.map((item) => ({
          ...item,
          ...productDetails.find((prod) => prod.id === item.productId)
        }))
      }))
    )
  }, [history])
  return (
    <div className={className}>
      <PaneComp header='Lịch sử mua hàng' className='bg-white flex flex-col space-y-4 rounded-md'>
        <div className='p-4 pt-0 space-y-4'>
          {histories.map((history) => (
            <HistoryComp history={history} />
          ))}
          <Pagination total={3} className='flex justify-center' />
        </div>
      </PaneComp>
    </div>
  )
}
