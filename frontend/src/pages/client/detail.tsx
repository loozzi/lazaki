import { Skeleton } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DescriptionItemComp } from '~/components/item/desc-item'
import { DetailItemComp } from '~/components/item/detail-item'
import { ListCardItemComp } from '~/components/list-card-item'
import { ListViewReviewComp } from '~/components/review/list-review'
import { ProductDetailResponse } from '~/models/product'

export const ViewDetailPage = () => {
  const params = useParams()
  const [product, setProduct] = useState<ProductDetailResponse | undefined>(undefined)

  const reviews = [
    {
      id: 1,
      rating: 3,
      content: 'Sản phẩm tốt',
      user: {
        id: 1,
        name: 'Nguyễn Văn A'
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
      rating: 4,
      content: 'Sản phẩm rất tốt',
      user: {
        id: 2,
        name: 'Nguyễn Văn B'
      },
      created_at: '2021-09-02T00:00:00Z'
    },
    {
      id: 3,
      rating: 5,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, lorem tempor incididunt ut labore et dolore magna aliqua, lorem ',
      user: {
        id: 3,
        name: 'Nguyễn Văn C'
      },
      images: ['https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lunih38whb1ha8.webp'],
      created_at: '2021-09-03T00:00:00Z'
    },
    {
      id: 4,
      rating: 4,
      content:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      user: {
        id: 4,
        name: 'Nguyễn Văn D'
      },
      created_at: '2021-09-04T00:00:00Z'
    }
  ]

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
          <ListCardItemComp heading='Sản phẩm tương tự' items={[1, 2, 3, 4, 5, 6]} isColumn />
        </div>
      </div>
    </div>
  )
}
