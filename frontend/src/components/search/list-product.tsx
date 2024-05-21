import { ProductResponse } from '~/models/product'
import { CardItem } from '../item/card-item'

interface ListSearchProductProps {
  className?: string
  products: ProductResponse[]
  bottomContent?: React.ReactNode
  loading?: boolean
  numberLoading?: number
}

export const ListSearchProductComp = (props: ListSearchProductProps) => {
  const { className, products, bottomContent, loading } = props

  return (
    <div className={className}>
      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
          {products.map((product, index) => (
            <CardItem key={index} size='md' item={product} />
          ))}
        </div>
        {products.length === 0 && !loading && (
          <div className='text-center text-slate-400 text-lg font-semibold w-full'>Không tìm thấy sản phẩm nào</div>
        )}
        {loading && <div className='text-center text-slate-400 text-lg font-semibold w-full'>Đang tìm kiếm</div>}
        {bottomContent}
      </div>
    </div>
  )
}
