import { useState } from 'react'
import { CardItem } from '../item/card-item'
import { Pagination } from '@nextui-org/react'

interface ListSearchProductProps {
  className?: string
}

export const ListSearchProductComp = (props: ListSearchProductProps) => {
  const { className } = props

  const [products, setProducts] = useState<any[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  return (
    <div className={className}>
      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
          {products.map((product, index) => (
            <CardItem key={index} size='md' item={product} />
          ))}
        </div>
        <Pagination total={100} className='mt-2' />
      </div>
    </div>
  )
}
