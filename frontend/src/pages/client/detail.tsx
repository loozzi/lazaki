import { Skeleton } from '@nextui-org/react'
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

  useEffect(() => {
    // call api get product detail
    const { permalink } = params
    productService.detail(permalink || '').then((res) => {
      setProduct(res.data)
    })

    // call api get reviews
    reviewService.getAll(permalink || '', { page: 1, limit: 5 }).then((res) => {
      if (res.status === 200) {
        setReviews(res.data?.data || [])
      }
    })

    // call api get suggest products
    // set suggest products
    // const item: ProductResponse = {
    //   image: 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-g0vtmbg1llive9',
    //   name: 'Sản phẩm có tên là giống với tên của sản phẩm ở chỗ bán sản phẩm',
    //   price: 100000,
    //   sold: 592,
    //   slug: 'san-pham-co-ten-la-giong-voi-ten-cua-san-pham-o-cho-ban-san-pham',
    //   rating: 4.5
    // }
    // setSuggestProducts([item, item, item, item, item])
  }, [params])

  useEffect(() => {
    if (!product) return
    productService.search({ page: 1, limit: 5, categories: product?.categories[0].slug }).then((res) => {
      setSuggestProducts(res.data?.data || [])
    })
  }, [product])

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
          <ListCardItemComp heading='Sản phẩm tương tự' items={suggestProducts} isColumn />
        </div>
      </div>
    </div>
  )
}
