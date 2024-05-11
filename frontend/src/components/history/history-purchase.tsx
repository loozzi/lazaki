import { Pagination } from '@nextui-org/react'
import { useState } from 'react'
import { HistoryComp } from './history'

interface HistoryPurchaseProps {
  className?: string
}

export const HistoryPurchaseComp = (props: HistoryPurchaseProps) => {
  const { className } = props
  const [histories, setHistories] = useState<any[]>([
    {
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
          reviewed: false
        },
        {
          id: 2,
          name: 'Áo thun nữ',
          price: 100000,
          old_price: 120000,
          quantity: 10,
          image: 'https://via.placeholder.com/150',
          permalink: '/ao-thun-nu',
          reviewed: true
        }
      ]
    },
    {
      id: 2,
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
          reviewed: false
        },
        {
          id: 2,
          name: 'Áo thun nữ',
          price: 100000,
          old_price: 120000,
          quantity: 10,
          image: 'https://via.placeholder.com/150',
          permalink: '/ao-thun-nu',
          reviewed: true
        }
      ]
    },
    {
      id: 3,
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
          reviewed: false
        },
        {
          id: 2,
          name: 'Áo thun nữ',
          price: 100000,
          old_price: 120000,
          quantity: 10,
          image: 'https://via.placeholder.com/150',
          permalink: '/ao-thun-nu',
          reviewed: true
        }
      ]
    }
  ])
  return (
    <div className={className}>
      <div className='p-4 pt-0 space-y-4'>
        {histories.map((history) => (
          <HistoryComp history={history} />
        ))}
        <Pagination total={3} className='flex justify-center' />
      </div>
    </div>
  )
}
