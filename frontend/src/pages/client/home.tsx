import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { ListCardItemComp } from '~/components/list-card-item'
import { ProductResponse } from '~/models/product'
import productService from '~/services/product.service'

export const HomePage = () => {
  document.title = 'Trang chủ - Lazaki'

  const [suggestProducts, setSuggestProducts] = useState<ProductResponse[]>([])
  const [currentSuggestProductPage, setCurrentSuggestProductPage] = useState(1)
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false)
  const [iphoneProducts, setIphoneProducts] = useState<ProductResponse[]>([])
  const [currentIphoneProductPage, setCurrentIphoneProductPage] = useState(1)
  const [samsungProducts, setSamsungProducts] = useState<ProductResponse[]>([])
  const [currentSamsungProductPage, setCurrentSamsungProductPage] = useState(1)
  const [laptopProducts, setLaptopProducts] = useState<ProductResponse[]>([])
  const [currentLaptopProductPage, setCurrentLaptopProductPage] = useState(1)
  const [tvProducts, setTvProducts] = useState<ProductResponse[]>([])
  const [currentTvProductPage, setCurrentTvProductPage] = useState(1)
  const [cameraProducts, setCameraProducts] = useState<ProductResponse[]>([])
  const [currentCameraProductPage, setCurrentCameraProductPage] = useState(1)

  useEffect(() => {
    setLoadingSuggestions(true)
    productService.suggest({ page: currentSuggestProductPage, limit: 10 }).then((res) => {
      setSuggestProducts([...suggestProducts, ...res.data!.data])
      setLoadingSuggestions(false)
    })
  }, [currentSuggestProductPage])

  useEffect(() => {
    productService.search({ page: currentIphoneProductPage, limit: 10, keyword: 'iphone' }).then((res) => {
      setIphoneProducts([...iphoneProducts, ...res.data!.data])
    })
  }, [currentIphoneProductPage])

  useEffect(() => {
    productService.search({ page: currentSamsungProductPage, limit: 10, keyword: 'điện thoại samsung' }).then((res) => {
      setSamsungProducts([...samsungProducts, ...res.data!.data])
    })
  }, [currentSamsungProductPage])

  useEffect(() => {
    productService
      .search({ page: currentLaptopProductPage, limit: 10, keyword: 'laptop', minPrice: 2000000 })
      .then((res) => {
        setLaptopProducts([...laptopProducts, ...res.data!.data])
      })
  }, [currentLaptopProductPage])

  useEffect(() => {
    productService.search({ page: currentTvProductPage, limit: 10, keyword: 'tv', minPrice: 3000000 }).then((res) => {
      setTvProducts([...tvProducts, ...res.data!.data])
    })
  }, [currentTvProductPage])

  useEffect(() => {
    productService
      .search({ page: currentCameraProductPage, limit: 10, keyword: 'camera', minPrice: 200000 })
      .then((res) => {
        setCameraProducts([...cameraProducts, ...res.data!.data])
      })
  }, [currentCameraProductPage])

  return (
    <div>
      <ListCardItemComp
        heading='Sản phẩm gợi ý'
        items={suggestProducts}
        loading={loadingSuggestions}
        numberLoading={10}
        className='mt-4 bg-white rounded-lg'
        bottomContent={
          <div className='flex justify-center py-2'>
            {suggestProducts.length > 0 && !loadingSuggestions ? (
              <Button
                color='primary'
                variant='flat'
                size='md'
                onClick={() => setCurrentSuggestProductPage(currentSuggestProductPage + 1)}
              >
                Xem thêm
              </Button>
            ) : (
              <span className='pb-4'>Không có sản phẩm gợi ý</span>
            )}
          </div>
        }
      />
      <ListCardItemComp
        className='mt-4 bg-white rounded-lg'
        heading='Điện thoại Iphone'
        items={iphoneProducts}
        loading={iphoneProducts.length === 0}
        numberLoading={10}
        bottomContent={
          <div className='flex justify-center py-2'>
            <Button
              color='primary'
              variant='flat'
              size='md'
              onClick={() => setCurrentIphoneProductPage(currentIphoneProductPage + 1)}
            >
              Xem thêm
            </Button>
          </div>
        }
      />
      <ListCardItemComp
        className='mt-4 bg-white rounded-lg'
        heading='Điện thoại Samsung'
        items={samsungProducts}
        loading={samsungProducts.length === 0}
        numberLoading={10}
        bottomContent={
          <div className='flex justify-center py-2'>
            <Button
              color='primary'
              variant='flat'
              size='md'
              onClick={() => setCurrentSamsungProductPage(currentSamsungProductPage + 1)}
            >
              Xem thêm
            </Button>
          </div>
        }
      />
      <ListCardItemComp
        className='mt-4 bg-white rounded-lg'
        heading='Laptop'
        items={laptopProducts}
        loading={laptopProducts.length === 0}
        numberLoading={10}
        bottomContent={
          <div className='flex justify-center py-2'>
            <Button
              color='primary'
              variant='flat'
              size='md'
              onClick={() => setCurrentLaptopProductPage(currentLaptopProductPage + 1)}
            >
              Xem thêm
            </Button>
          </div>
        }
      />

      <ListCardItemComp
        className='mt-4 bg-white rounded-lg'
        heading='TV'
        items={tvProducts}
        loading={tvProducts.length === 0}
        numberLoading={10}
        bottomContent={
          <div className='flex justify-center py-2'>
            <Button
              color='primary'
              variant='flat'
              size='md'
              onClick={() => setCurrentTvProductPage(currentTvProductPage + 1)}
            >
              Xem thêm
            </Button>
          </div>
        }
      />

      <ListCardItemComp
        className='mt-4 bg-white rounded-lg'
        heading='Camera'
        items={cameraProducts}
        loading={cameraProducts.length === 0}
        numberLoading={10}
        bottomContent={
          <div className='flex justify-center py-2'>
            <Button
              color='primary'
              variant='flat'
              size='md'
              onClick={() => setCurrentCameraProductPage(currentCameraProductPage + 1)}
            >
              Xem thêm
            </Button>
          </div>
        }
      />
    </div>
  )
}
