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

    productService.suggest({ page: 1, limit: 10 }).then((res) => {
      setSuggestProducts(res.data!.data)
    })
  }, [])

  return (
    <div>
      <ListCardItemComp
        className='mt-4'
        heading='Gợi ý sản phẩm'
        items={products}
        loading={products.length === 0}
        numberLoading={10}
      />
      <ListCardItemComp
        className='mt-4'
        heading='Gợi ý cho bạn'
        items={suggestProducts}
        loading={suggestProducts.length === 0}
        numberLoading={10}
      />
    </div>
  )
}
