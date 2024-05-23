import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { ListCardItemComp } from '~/components/list-card-item'
import { ProductResponse } from '~/models/product'
import productService from '~/services/product.service'

export const HomePage = () => {
  document.title = 'Trang chủ - Lazaki'
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [currentProductPage, setCurrentProductPage] = useState(1)
  const [suggestProducts, setSuggestProducts] = useState<ProductResponse[]>([])
  const [currentSuggestPage, setCurrentSuggestPage] = useState(1)

  useEffect(() => {
    productService.all({ page: currentProductPage, limit: 10, sort: 'desc' }).then((res) => {
      setProducts([...products, ...res.data!.data])
    })
  }, [currentProductPage])

  useEffect(() => {
    productService.suggest({ page: currentSuggestPage, limit: 10 }).then((res) => {
      setSuggestProducts([...suggestProducts, ...res.data!.data])
    })
  }, [currentSuggestPage])

  return (
    <div>
      <ListCardItemComp
        className='mt-4 bg-white rounded-lg'
        heading='Gợi ý sản phẩm'
        items={products}
        loading={products.length === 0}
        numberLoading={10}
        bottomContent={
          <div className='flex justify-center py-2'>
            <Button
              color='primary'
              variant='flat'
              size='md'
              onClick={() => setCurrentProductPage(currentProductPage + 1)}
            >
              Xem thêm
            </Button>
          </div>
        }
      />
      <ListCardItemComp
        className='mt-4 bg-white rounded-lg'
        heading='Gợi ý cho bạn'
        items={suggestProducts}
        loading={suggestProducts.length === 0}
        numberLoading={10}
        bottomContent={
          <div className='flex justify-center py-2'>
            <Button
              color='primary'
              variant='flat'
              size='md'
              onClick={() => setCurrentSuggestPage(currentSuggestPage + 1)}
            >
              Xem thêm
            </Button>
          </div>
        }
      />
    </div>
  )
}
