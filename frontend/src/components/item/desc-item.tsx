import { ProductDetailResponse } from '~/models/product'
import { PaneComp } from '../pane'

interface DescriptionItemProps {
  product: ProductDetailResponse
  className?: string
}

export const DescriptionItemComp = (props: DescriptionItemProps) => {
  const { product, className } = props
  return (
    <PaneComp header='Mô tả' className={className}>
      <div className='p-4 bg-white rounded-b-lg mx-2 lg:mx-0'>
        <div>
          <div className='w-full bg-slate-100 p-4 rounded-md'>
            <span className='text-2xl '>Chi tiết sản phẩm</span>
          </div>
          <div className='p-4 flex flex-col gap-2'>
            <div className='flex'>
              <span className='w-32 text-gray-500'>Danh mục</span>
              <div>{product.categories.map((cat) => cat.name).join(',')}</div>
            </div>
            {product.properties.map((property, index) => (
              <div key={index} className='flex'>
                <span className='w-32 text-gray-500'>{property.name}</span>
                <div>{property.value}</div>
              </div>
            ))}
            <div className='flex'>
              <span className='w-32 text-gray-500'>Kho hàng</span>
              <div>{product.variations.reduce((pre, cur) => cur.quantity + pre, 0)}</div>
            </div>
          </div>
        </div>
        <div>
          <div className='w-full bg-slate-100 p-4 rounded-md'>
            <span className='text-2xl '>Mô tả sản phẩm</span>
          </div>
          <div className='p-4'>{product.description}</div>
        </div>
      </div>
    </PaneComp>
  )
}
