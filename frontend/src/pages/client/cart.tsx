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
import { Button } from '@nextui-org/react'

export const ViewCartPage = () => {
  document.title = 'Giỏ hàng'
  const [suggestProducts, setSuggestProducts] = useState<ProductResponse[]>([])
  const [currentSuggestProductPage, setSuggestProductPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)

  useEffect(() => {
    setLoading(true)
    productService.suggest({ page: currentSuggestProductPage, limit: 5 }).then((res) => {
      setSuggestProducts([...suggestProducts, ...res.data?.data!])
      setLoading(false)
    })
  }, [cart, currentSuggestProductPage])

  useEffect(() => {
    orderService.current().then((res) => {
      if (res.data) dispatch(orderActions.setCart(res.data))
    })
  }, [])

  return (
    <div className='mt-2 lg:mt-4'>
      <PaneComp header='Giỏ hàng' className='mx-2 bg-white rounded-lg pb-2'>
        {cart?.orderDetails.length === 0 ? (
          <EmptyCartComp />
        ) : (
          <DetailCartComp
            products={cart?.orderDetails || []}
            className=''
            onClick={() => history.push(routes.client.purchase)}
          />
        )}
      </PaneComp>
      <ListCardItemComp
        className='mx-2 mt-2 lg:mt-4 bg-white rounded-lg'
        heading='Sản phẩm gợi ý'
        items={suggestProducts}
        loading={loading}
        numberLoading={5}
        bottomContent={
          <div className='flex justify-center py-2'>
            {suggestProducts.length > 0 && !loading ? (
              <Button
                color='primary'
                variant='flat'
                size='md'
                onClick={() => setSuggestProductPage(currentSuggestProductPage + 1)}
              >
                Xem thêm
              </Button>
            ) : (
              <span className='pb-4'>Không có sản phẩm gợi ý</span>
            )}
          </div>
        }
      />
    </div>
  )
}
