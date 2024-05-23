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
import productService from '~/services/product.service'

export const ViewCartPage = () => {
  document.title = 'Giỏ hàng'
  const [suggestProducts, setSuggestProducts] = useState<ProductResponse[]>([])
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)

  useEffect(() => {
    productService.suggest({ page: 1, limit: 5 }).then((res) => setSuggestProducts(res.data?.data || []))
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
      <ListCardItemComp
        className='mx-2 mt-4'
        heading='Sản phẩm gợi ý'
        items={suggestProducts}
        loading={suggestProducts.length === 0}
        numberLoading={5}
      />
    </div>
  )
}
