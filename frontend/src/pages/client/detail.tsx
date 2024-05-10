import { DescriptionItemComp } from '~/components/item/desc-item'
import { DetailItemComp } from '~/components/item/detail-item'
import { ListCardItemComp } from '~/components/list-card-item'
import { ListViewReviewComp } from '~/components/review/list-review'

export const ViewDetailPage = () => {
  const item = {
    images: [
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1n8mxd16',
        alt: 'Image 1',
        isPrimary: true
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1ne9754b',
        alt: 'Image 2',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1na1ht2e',
        alt: 'Image 3',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1nbg29de',
        alt: 'Image 4',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1ncump72',
        alt: 'Image 5',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1nfnrl9a',
        alt: 'Image 6',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1nh2c1ce',
        alt: 'Image 7',
        isPrimary: false
      }
    ],
    title:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    price: 1000000,
    sold: 349,
    rating: 2.5,
    reviews: 100,
    quantity: 129,
    old_price: 1200000,
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  }

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
        'https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lr7dmjo0fd8kd6.webp'
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

  return (
    <div>
      <DetailItemComp item={item} />
      <div className='mt-2 grid grid-cols-10 gap-2 lg:gap-4'>
        <div className='flex flex-col lg:col-span-8 md:col-span-6 col-span-10'>
          <DescriptionItemComp item={item} />
          <ListViewReviewComp reviews={reviews} className='mt-4' />
        </div>
        <div className='lg:col-span-2 md:col-span-4 col-span-10'>
          <ListCardItemComp heading='Sản phẩm tương tự' items={[1, 2, 3, 4, 5, 6]} isColumn />
        </div>
      </div>
    </div>
  )
}
