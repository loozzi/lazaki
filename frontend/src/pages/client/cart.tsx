import { useEffect, useState } from 'react'
import { PaneComp } from '~/components/pane'

import { useAppDispatch, useAppSelector } from '~/app/hook'
import { DetailCartComp } from '~/components/cart/cart-detail'
import { EmptyCartComp } from '~/components/cart/empty'
import { ListCardItemComp } from '~/components/list-card-item'
import { orderActions, selectCart } from '~/hooks/order/order.slice'
import { ProductResponse } from '~/models/product'
import { history } from '~/configs/history'
import routes from '~/configs/routes'
import orderService from '~/services/order.service'

export const ViewCartPage = () => {
  const [suggestProducts, setSuggestProducts] = useState<ProductResponse[]>([])
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)

  useEffect(() => {
    const item: ProductResponse = {
      image: 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-g0vtmbg1llive9',
      name: 'Sản phẩm có tên là giống với tên của sản phẩm ở chỗ bán sản phẩm',
      price: 100000,
      sold: 592,
      slug: 'san-pham-co-ten-la-giong-voi-ten-cua-san-pham-o-cho-ban-san-pham',
      rating: 4.5
    }
    setSuggestProducts([item, item, item, item, item])
  }, [cart])

  useEffect(() => {
    orderService.current().then((res) => {
      if (res.data) dispatch(orderActions.setCart(res.data))
    })
  }, [])

  return (
    <div className='mt-4'>
      <PaneComp header='Giỏ hàng' className='mx-2'>
        {cart?.orderDetails.length === 0 ? (
          <EmptyCartComp />
        ) : (
          <DetailCartComp
            products={cart?.orderDetails || []}
            className='bg-white pb-4'
            onClick={() => history.push(routes.client.purchase)}
          />
        )}
      </PaneComp>
      <ListCardItemComp className='mx-2 mt-4' heading='Sản phẩm gợi ý' items={suggestProducts} />
    </div>
  )
}
