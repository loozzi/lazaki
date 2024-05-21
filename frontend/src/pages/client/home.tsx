import { Skeleton } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { ListCardItemComp } from '~/components/list-card-item'
import { ProductResponse } from '~/models/product'
import productService from '~/services/product.service'

export const HomePage = () => {
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [suggestProducts, setSuggestProducts] = useState<ProductResponse[]>([])

  useEffect(() => {
    productService.all({ page: 1, limit: 10, sort: 'desc' }).then((res) => {
      setProducts(res.data!.data)
    })

    // const item: ProductResponse = {
    //   image: 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-g0vtmbg1llive9',
    //   name: 'Sản phẩm có tên là giống với tên của sản phẩm ở chỗ bán sản phẩm',
    //   price: 100000,
    //   sold: 592,
    //   slug: 'san-pham-co-ten-la-giong-voi-ten-cua-san-pham-o-cho-ban-san-pham',
    //   rating: 4.5
    // }
    // setSuggestProducts([
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item,
    //   item
    // ])
    productService.suggest({ page: 1, limit: 10 }).then((res) => {
      setSuggestProducts(res.data!.data)
    })
  }, [])

  return (
    <div>
      <ListCardItemComp className='mt-4' heading='Gợi ý sản phẩm' items={products} />
      {products.length === 0 && <Skeleton className='w-full h-[480px] rounded-lg' />}
      <ListCardItemComp className='mt-4' heading='Gợi ý cho bạn' items={suggestProducts} />
    </div>
  )
}
