import { useEffect, useState } from 'react'
import { PaneComp } from '~/components/pane'

import { ListCardItemComp } from '~/components/list-card-item'
import { EmptyCartComp } from '~/components/cart/empty'
import { DetailCartComp } from '~/components/cart/cart-detail'

export const ViewCartPage = () => {
  const [products, setProducts] = useState<any[]>([])

  const handleChangeProducts = (_products: any[]) => {
    setProducts((products) =>
      products
        .filter((p) => _products.map((_p) => _p.id).includes(p.id))
        .map((p) => _products.find((_p) => _p.id === p.id))
    )
  }

  useEffect(() => {
    setProducts([
      {
        id: 1,
        checked: true,
        name: 'Sản phẩm này có tên là sản phẩm này có làm sao để biết tên sản phẩm thì phải xem tên sản phẩm là gì sản phẩm thì phải xem tên sản phẩm là gì',
        price: 2023324,
        old_price: 1239121,
        quantity: 2,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        checked: true,
        name: 'àdlkjlkjl',
        price: 222090,
        old_price: 1239121,
        quantity: 1,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 3,
        checked: true,
        name: 'ádfasdfjklasdf',
        price: 1028221,
        old_price: 1239121,
        quantity: 3,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 4,
        checked: true,
        name: 'ádfasdflkj',
        price: 3981212,
        old_price: 1239121,
        quantity: 4,
        image: 'https://via.placeholder.com/150'
      }
    ])
  }, [])

  return (
    <div className='mt-4'>
      <PaneComp header='Giỏ hàng' className='mx-2'>
        {products.length === 0 ? (
          <EmptyCartComp />
        ) : (
          <DetailCartComp handleChangeProducts={handleChangeProducts} products={products} className='bg-white pb-4' />
        )}
      </PaneComp>
      <ListCardItemComp className='mx-2 mt-4' heading='Sản phẩm gợi ý' items={[1, 2, 3, 4, 5, 6, 7]} />
    </div>
  )
}
