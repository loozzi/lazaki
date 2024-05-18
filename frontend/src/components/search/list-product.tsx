import { useEffect, useState } from 'react'
import { CardItem } from '../item/card-item'
import { Pagination } from '@nextui-org/react'

interface ListSearchProductProps {
  className?: string
}

export const ListSearchProductComp = (props: ListSearchProductProps) => {
  const { className } = props

  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const item = {
      image: 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-g0vtmbg1llive9',
      name: 'Sản phẩm có tên là giống với tên của sản phẩm ở chỗ bán sản phẩm',
      price: 100000,
      sold: 592,
      slug: 'san-pham-co-ten-la-giong-voi-ten-cua-san-pham-o-cho-ban-san-pham',
      rating: 4.5
    }
    setProducts([
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item,
      item
    ])
  }, [])

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
