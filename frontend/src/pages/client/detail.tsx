import { Skeleton } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DescriptionItemComp } from '~/components/item/desc-item'
import { DetailItemComp } from '~/components/item/detail-item'
import { ListCardItemComp } from '~/components/list-card-item'
import { ListViewReviewComp } from '~/components/review/list-review'
import { ProductDetailResponse, ProductResponse } from '~/models/product'
import { ReviewResponse } from '~/models/review'

export const ViewDetailPage = () => {
  const params = useParams()
  const [product, setProduct] = useState<ProductDetailResponse | undefined>(undefined)
  const [reviews, setReviews] = useState<ReviewResponse[]>([])
  const [suggestProducts, setSuggestProducts] = useState<ProductResponse[]>([])

  useEffect(() => {
    // call api get product detail
    // set item
    setProduct({
      id: 1,
      name: 'Sản phẩm này là sản phẩm có tên là sản phẩm',
      description: 'Mô tả sản phẩm',
      properties: [
        {
          name: 'Màu sắc',
          value: 'Đen'
        },
        {
          name: 'Chất liệu',
          value: 'Cotton'
        }
      ],
      variations: [
        {
          id: 1,
          type: 'Màu + Size',
          name: 'Đen, XL',
          option: 'Đen, XL',
          image: 'https://via.placeholder.com/450',
          price: 100000,
          oldPrice: 450000,
          quantity: 10,
          sold: 10
        },
        {
          id: 2,
          type: 'Màu + Size',
          name: 'Đen, L',
          option: 'Đen, L',
          image: 'https://via.placeholder.com/450',
          price: 90000,
          oldPrice: 140000,
          quantity: 20,
          sold: 20
        },
        {
          id: 3,
          type: 'Màu + Size',
          name: 'Đen, M',
          option: 'Đen, M',
          image: 'https://via.placeholder.com/450',
          price: 80000,
          oldPrice: 130000,
          quantity: 30,
          sold: 30
        },
        {
          id: 4,
          type: 'Màu + Size',
          name: 'Trắng, XL',
          option: 'Trắng, XL',
          image: 'https://via.placeholder.com/450',
          price: 100000,
          oldPrice: 450000,
          quantity: 10,
          sold: 10
        },
        {
          id: 5,
          type: 'Màu + Size',
          name: 'Trắng, L',
          option: 'Trắng, L',
          image: 'https://via.placeholder.com/450',
          price: 90000,
          oldPrice: 140000,
          quantity: 20,
          sold: 20
        },
        {
          id: 6,
          type: 'Màu + Size',
          name: 'Trắng, M',
          option: 'Trắng, M',
          image: 'https://via.placeholder.com/450',
          price: 80000,
          oldPrice: 130000,
          quantity: 30,
          sold: 30
        },
        {
          id: 7,
          type: 'Màu + Size',
          name: 'Trắng, XL',
          option: 'Trắng, XL',
          image: 'https://via.placeholder.com/450',
          price: 100000,
          oldPrice: 450000,
          quantity: 10,
          sold: 10
        },
        {
          id: 8,
          type: 'Màu + Size',
          name: 'Trắng, L',
          option: 'Trắng, L',
          image: 'https://via.placeholder.com/450',
          price: 90000,
          oldPrice: 140000,
          quantity: 0,
          sold: 20
        }
      ],
      images: [
        {
          link: 'https://via.placeholder.com/450',
          variationId: 1,
          isPrimary: true
        },
        {
          link: 'https://via.placeholder.com/450',
          variationId: 2,
          isPrimary: false
        },
        {
          link: 'https://via.placeholder.com/450',
          variationId: 3,
          isPrimary: false
        }
      ],
      categories: [
        {
          id: 1,
          name: 'Áo thun',
          slug: 'ao-thun',
          description: 'Áo thun nam'
        }
      ]
    })

    // call api get reviews
    // set reviews
    setReviews([
      {
        id: 1,
        value: 3,
        content: 'Sản phẩm tốt',
        fullName: 'Nguyễn Văn A',
        variation: {
          type: 'Màu + Size',
          name: 'Đen, XL',
          option: 'Đen, XL'
        },
        images: [
          'https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lr7dmjnzzwyh06.webp',
          'https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lr7dmjo0fd8kd6.webp',
          'https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lr7dmjnzzwyh06.webp',
          'https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lr7dmjo0fd8kd6.webp',
          'https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lr7dmjnzzwyh06.webp'
        ],
        created_at: '2021-09-01T00:00:00Z'
      },
      {
        id: 2,
        value: 4,
        content: 'Sản phẩm rất tốt',
        fullName: 'Nguyễn Văn B',
        variation: {
          type: 'Màu + Size',
          name: 'Đen, XL',
          option: 'Đen, XL'
        },
        images: [],
        created_at: '2021-09-02T00:00:00Z'
      },
      {
        id: 3,
        value: 5,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, lorem tempor incididunt ut labore et dolore magna aliqua, lorem ',
        fullName: 'Nguyễn Văn C',
        variation: {
          type: 'Màu + Size',
          name: 'Đen, XL',
          option: 'Đen, XL'
        },
        images: ['https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lunih38whb1ha8.webp'],
        created_at: '2021-09-03T00:00:00Z'
      },
      {
        id: 4,
        value: 4,
        content:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        fullName: 'Nguyễn Văn D',
        variation: {
          type: 'Màu + Size',
          name: 'Đen, XL',
          option: 'Đen, XL'
        },
        created_at: '2021-09-04T00:00:00Z'
      }
    ])

    // call api get suggest products
    // set suggest products
    const item: ProductResponse = {
      image: 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-g0vtmbg1llive9',
      name: 'Sản phẩm có tên là giống với tên của sản phẩm ở chỗ bán sản phẩm',
      price: 100000,
      sold: 592,
      slug: 'san-pham-co-ten-la-giong-voi-ten-cua-san-pham-o-cho-ban-san-pham',
      rating: 4.5
    }
    setSuggestProducts([item, item, item, item, item])
  }, [params])

  return (
    <div>
      {product ? <DetailItemComp product={product} /> : <Skeleton></Skeleton>}
      <div className='mt-2 grid grid-cols-10 gap-2 lg:gap-4'>
        <div className='flex flex-col lg:col-span-8 md:col-span-6 col-span-10'>
          {product && <DescriptionItemComp product={product} />}
          <ListViewReviewComp reviews={reviews} className='mt-4' />
        </div>
        <div className='lg:col-span-2 md:col-span-4 col-span-10'>
          <ListCardItemComp heading='Sản phẩm tương tự' items={suggestProducts} isColumn />
        </div>
      </div>
    </div>
  )
}
