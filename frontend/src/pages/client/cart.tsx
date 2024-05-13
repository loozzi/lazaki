import { useEffect, useState } from 'react'
import { PaneComp } from '~/components/pane'

import { ListCardItemComp } from '~/components/list-card-item'
import { EmptyCartComp } from '~/components/cart/empty'
import { DetailCartComp } from '~/components/cart/cart-detail'
import { useAppSelector } from '~/app/hook'
import { selectCart } from '~/hooks/order/order.slice'
import { ProductDetailResponse } from '~/models/product'

export const ViewCartPage = () => {
  const [products, setProducts] = useState<ProductDetailResponse[]>([])
  const cart = useAppSelector(selectCart)

  useEffect(() => {
    setProducts([])
  }, [cart])

  return (
    <div className='mt-4'>
      <PaneComp header='Giỏ hàng' className='mx-2'>
        {products.length === 0 ? <EmptyCartComp /> : <DetailCartComp products={products} className='bg-white pb-4' />}
      </PaneComp>
      <ListCardItemComp className='mx-2 mt-4' heading='Sản phẩm gợi ý' items={[1, 2, 3, 4, 5, 6, 7]} />
    </div>
  )
}
