import { ProductDetailResponse } from '~/models/product'
import { PaneComp } from '../pane'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'

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
              {/* <div>{product.categories.map((cat) => cat.name).join(', ')}</div> */}
              <div className='flex gap-2'>
                {product.categories.map((cat, index) => (
                  <span key={cat.slug}>
                    <Link className='text-blue-600' to={`${routes.client.search}/?categories=${cat.slug}`}>
                      {cat.name}
                    </Link>
                    {index < product.categories.length - 1 && ' - '}
                  </span>
                ))}
              </div>
            </div>
            {product.properties.map((property, index) => (
              <div key={index} className='flex'>
                <span className='w-32 text-gray-500'>{property.name}</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: property.value
                  }}
                ></span>
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
          <span className='p-4' dangerouslySetInnerHTML={{ __html: product.description }}></span>
        </div>
      </div>
    </PaneComp>
  )
}
