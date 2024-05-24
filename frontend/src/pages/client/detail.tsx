import { Button, Skeleton } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DescriptionItemComp } from '~/components/item/desc-item'
import { DetailItemComp } from '~/components/item/detail-item'
import { ListCardItemComp } from '~/components/list-card-item'
import { ListViewReviewComp } from '~/components/review/list-review'
import { ProductDetailResponse, ProductResponse } from '~/models/product'
import { ReviewResponse } from '~/models/review'
import productService from '~/services/product.service'
import reviewService from '~/services/review.service'

export const ViewDetailPage = () => {
  const params = useParams()
  const [product, setProduct] = useState<ProductDetailResponse | undefined>(undefined)
  const [reviews, setReviews] = useState<ReviewResponse[]>([])
  const [suggestProducts, setSuggestProducts] = useState<ProductResponse[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false)
  const [currentSuggestProductPage, setSuggestProductPage] = useState<number>(1)

  useEffect(() => {
    // call api get product detail
    const { permalink } = params
    productService.detail(permalink || '').then((res) => {
      setProduct(res.data)
      document.title = res.data!.name
      window.scrollTo(0, 0)
    })

    // call api get reviews
    reviewService.getAll(permalink || '', { page: 1, limit: 5 }).then((res) => {
      if (res.status === 200) {
        setReviews(res.data?.data || [])
      }
    })

    setSuggestProducts([])
  }, [params])

  useEffect(() => {
    if (!product) return
    const { permalink } = params
    setLoadingSuggestions(true)
    productService.similar(permalink || '', { page: currentSuggestProductPage, limit: 5 }).then((res) => {
      setSuggestProducts([...suggestProducts, ...res.data?.data!])
      setLoadingSuggestions(false)
    })
  }, [product, currentSuggestProductPage])

  return (
    <div>
      {product ? <DetailItemComp product={product} /> : <Skeleton className='w-full h-[300px] rounded-lg mt-4' />}
      <div className='mt-2 grid grid-cols-10 gap-2 lg:gap-4'>
        <div className='flex flex-col lg:col-span-8 md:col-span-6 col-span-10'>
          {product && <DescriptionItemComp product={product} />}
          <div id='reviews'>
            <ListViewReviewComp reviews={reviews} className='mt-4' />
          </div>
        </div>
        <div className='lg:col-span-2 md:col-span-4 col-span-10'>
          <ListCardItemComp
            heading='Tương tự'
            items={suggestProducts}
            isColumn
            loading={loadingSuggestions}
            numberLoading={5}
            className='bg-white rounded-lg'
            bottomContent={
              <div className='flex justify-center py-2'>
                {suggestProducts.length > 0 && !loadingSuggestions ? (
                  <Button
                    color='primary'
                    variant='flat'
                    size='md'
                    onClick={() => setSuggestProductPage(currentSuggestProductPage + 1)}
                  >
                    Xem thêm
                  </Button>
                ) : (
                  <span>Không có sản phẩm tương tự</span>
                )}
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}
