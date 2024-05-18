import { useEffect, useState } from 'react'
import { ListCardItemComp } from '~/components/list-card-item'
import { ProductResponse } from '~/models/product'

export const HomePage = () => {
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [suggestProducts, setSuggestProducts] = useState<ProductResponse[]>([])

  useEffect(() => {
    const item: ProductResponse = {
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
    setSuggestProducts([
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
    <div>
      <ListCardItemComp className='mt-4' heading='Gợi ý sản phẩm' items={products} />
      <ListCardItemComp className='mt-4' heading='Gợi ý cho bạn' items={suggestProducts} />
    </div>
  )
}
