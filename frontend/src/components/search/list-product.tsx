import { ProductResponse } from '~/models/product'
import { CardItem } from '../item/card-item'

interface ListSearchProductProps {
  className?: string
  products: ProductResponse[]
}

export const ListSearchProductComp = (props: ListSearchProductProps) => {
  const { className, products } = props

  return (
    <div className={className}>
      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
          {products.map((product, index) => (
            <CardItem key={index} size='md' item={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
